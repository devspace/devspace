import React from 'react';

class Nav extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.screen !== this.props.screen;
	}

	trackLink(event) {
		mixpanel.track('Clicked Sidebar', {
			title: event.currentTarget.getAttribute('aria-label')
		});
	}

	handleScreenToggle(event) {
		this.trackLink(event);
		this.props.toggleScreen(event);
	}

	handleSettingsLink(event) {
		this.trackLink(event);
		this.props.toggleSettingsModal();
	}

	handleLogoutLink(event) {
		this.trackLink(event);
		this.props.logout();
	}

	render() {
		let isActivities = this.props.screen === 'Activities' ? 'active' : '';
		let isNotifications = this.props.screen === 'Notifications' ? 'active' : '';

		return (
			<div className="nav-container">
				<nav className="nav">
					<header className="nav-top">
						<ul className="nav-list">
							<li className="nav-item">
								<a className={"nav-link tooltipped tooltipped-e " + isActivities} onClick={this.handleScreenToggle.bind(this)} aria-label="Activities">
									<span className="nav-icon octicon octicon-home"></span>
								</a>
							</li>
							<li className="nav-item">
								<a className={"nav-link tooltipped tooltipped-e " + isNotifications} onClick={this.handleScreenToggle.bind(this)} aria-label="Notifications">
									<span className="nav-icon octicon octicon-bell"></span>
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