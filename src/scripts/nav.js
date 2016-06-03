import React from 'react';

import request from 'superagent';
import Throttle from 'superagent-throttle';

class Nav extends React.Component {
	constructor() {
		super();

		this.state = {
			prCounter: undefined,
			issueCounter: undefined
		};
	}

	/* ======================================================================
	   Lifecycle
	   ====================================================================== */

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.isOnline !== this.props.isOnline ||
			nextProps.isVisible !== this.props.isVisible ||
			nextState.prCounter !== this.state.prCounter ||
			nextState.issueCounter !== this.state.issueCounter;
	}

	componentDidMount() {
		this.throttle = new Throttle({
			rate: 15,
			concurrent: 15
		});

		this.initCounters();
	}

	componentWillUpdate(nextProps) {
		if (nextProps.isOnline === true) {
			this.initCounters();
		}
		else if (nextProps.isOnline === false) {
			this.clearCounters();
		}

		if (nextProps.isVisible === true) {
			this.initCounters();
		}
		else if (nextProps.isVisible === false) {
			this.clearCounters();
		}
	}

	componentWillUnmount() {
		this.clearCounters();
	}

	/* ======================================================================
	   Counters
	   ====================================================================== */

	initCounters() {
		this.fetchCounter('pr');
		this.fetchCounter('issue');

		this.prInterval = window.setInterval(() => {
			this.fetchCounter('pr');
		}, 60 * 1000);

		this.issueInterval = window.setInterval(() => {
			this.fetchCounter('issue');
		}, 60 * 1000);
	}

	fetchCounter(type) {
		request
			.get(`https://api.github.com/search/issues?q=state:open+is:${type}+user:${this.props.github.username}`)
			.use(this.throttle.plugin)
			.set('Authorization', 'token ' + this.props.github.accessToken)
			.end(this.handleCounterResponse.bind(this, type));
	}

	handleCounterResponse(type, error, response) {
		if (response && response.status === 200) {
			if (response.body.total_count > 99) {
				if (type === 'pr') {
					this.setState({
						prCounter: '99+'
					});
				} else if (type === 'issue') {
					this.setState({
						issueCounter: '99+'
					});
				}
			} else if (response.body.total_count !== 0) {
				if (type === 'pr') {
					this.setState({
						prCounter: response.body.total_count
					});
				} else if (type === 'issue') {
					this.setState({
						issueCounter: response.body.total_count
					});
				}
			}
		}
	}

	clearCounters() {
		window.clearInterval(this.prInterval);
		window.clearInterval(this.issueInterval);
	}

	/* ======================================================================
	   Trackers
	   ====================================================================== */

	trackLink(event) {
		mixpanel.track('Clicked Sidebar', {
			title: event.currentTarget.getAttribute('aria-label')
		});
	}

	handleSettingsLink(event) {
		this.trackLink(event);
		this.props.toggleSettingsModal();
	}

	handleLogoutLink(event) {
		this.trackLink(event);
		this.props.logout();
	}

	/* ======================================================================
	   Render
	   ====================================================================== */

	renderCounter(type) {
		if (type === 'pr') {
			if (this.state.prCounter) {
				return (
					<span className="nav-counter">{this.state.prCounter}</span>
				)
			}
		} else if (type === 'issue') {
			if (this.state.issueCounter) {
				return (
					<span className="nav-counter">{this.state.issueCounter}</span>
				)
			}
		}

		return;
	}

	render() {
		return (
			<div className="nav-container">
				<nav className="nav">
					<header className="nav-top">
						<ul className="nav-list">
							<li className="nav-item">
								<a className="nav-link tooltipped tooltipped-e" onClick={this.trackLink.bind(this)} href={"https://github.com/pulls?q=is:open+type:pr+user:%22" + this.props.github.username + "%22"} target="_blank" aria-label="Pull Requests">
									<span className="nav-icon octicon octicon-git-pull-request"></span>
									{this.renderCounter('pr')}
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link tooltipped tooltipped-e" onClick={this.trackLink.bind(this)} href={"https://github.com/issues?q=is:open+type:issue+user:%22" + this.props.github.username + "%22"} target="_blank" aria-label="Issues">
									<span className="nav-icon octicon octicon-issue-opened"></span>
									{this.renderCounter('issue')}
								</a>
							</li>
						</ul>
					</header>
					<footer className="nav-footer">
						<ul className="nav-list">
							<li className="nav-item">
								<a className="nav-link tooltipped tooltipped-e" onClick={this.trackLink.bind(this)} href="https://github.com/devspace/devspace/issues/new" target="_blank" aria-label="Report a bug">
									<span className="nav-icon octicon octicon-bug"></span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link tooltipped tooltipped-e" onClick={this.handleSettingsLink.bind(this)} aria-label="Settings">
									<span className="nav-icon octicon octicon-gear"></span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link tooltipped tooltipped-e" onClick={this.handleLogoutLink.bind(this)} aria-label="Logout">
									<span className="nav-icon octicon octicon-sign-out"></span>
								</a>
							</li>
						</ul>
					</footer>
				</nav>
			</div>
		)
	}
}

export default Nav;