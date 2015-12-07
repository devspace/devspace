'use strict';

import React from 'react';
import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import parse from 'parse-link-header';
import Scrollbar from 'perfect-scrollbar';
import { Spinner } from 'elemental/lib/Elemental';

import Event from './event';

class Column extends React.Component {
	constructor() {
		super();

		this.state = {
			events: undefined,
			error: undefined,
			fetchLastModified: '',
			fetchInterval: undefined
		};
	}

	componentDidMount() {
		Scrollbar.initialize(this.refs.content, {
			suppressScrollX: true
		});

		this.fetchEvents(this.props.details);

		let interval = this.setInterval(() => {
			this.fetchEvents(this.props.details);
		}, 60 * 1000);

		this.setState({
			fetchInterval: interval
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.details !== this.props.details) {
			this.fetchEvents(nextProps.details, true);
		}
	}

	componentWillUnmount() {
		Scrollbar.destroy(this.refs.content);
	}

	componentDidUpdate() {
		Scrollbar.update(this.refs.content);
	}

	fetchEvents(details, forceUpdate) {
		fetch(`https://api.github.com/${details.request.prefix}/${details.request.payload}/${details.request.suffix}`, {
			headers: {
				'Authorization': 'token ' + this.props.accessToken,
				'User-Agent': 'DevSpace',
				'If-Modified-Since': forceUpdate || this.state.fetchLastModified
			}
		})
		.then((response) => {
			let link = parse(response.headers.get('Link'));

			this.setState({
				fetchLastModified: response.headers.get('Last-Modified')
			});

			if (response.status === 200) {
				return response.json();
			} else if (response.status > 400) {
				throw new Error(response.statusText);
			} else {
				return this.state.events;
			}
		})
		.then((response) => {
			if (response.length > 0) {
				this.setState({
					events: response
				});
			}
			else {
				this.setState({
					error: 'No public events'
				});

				this.clearInterval(this.state.fetchInterval);
			}
		})
		.catch((error) => {
			this.setState({
				error: error.message
			});

			this.clearInterval(this.state.fetchInterval);
		});
	}

	renderEvent(event, key) {
		return <Event key={key} details={this.state.events[key]} />;
	}

	renderEventLoading() {
		return <div className="centered"><Spinner size="md" /></div>;
	}

	renderError() {
		return <div className="column-placeholder centered">{this.state.error}</div>;
	}

	renderContent() {
		if (this.state.events) {
			return this.state.events.map(this.renderEvent.bind(this));
		}
		else if (this.state.error) {
			return this.renderError();
		}
		else {
			return this.renderEventLoading();
		}
	}

	render() {
		return (
			<section className="column">
				<div className="column-container">
					<header className="column-header">
						<h1 className="column-header-title">
							<span className={"octicon octicon-" + this.props.details.icon}></span>
							{this.props.details.request.payload}
							<span className="octicon octicon-x" onClick={this.props.removeColumn.bind(this)}></span>
						</h1>
					</header>
					<div ref="content" className="column-content">
						{this.renderContent()}
					</div>
				</div>
			</section>
		)
	}
}

ReactMixin.onClass(Column, TimerMixin);

export default Column;