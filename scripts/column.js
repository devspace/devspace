import React from 'react';

import parse from 'parse-link-header';
import Scrollbar from 'perfect-scrollbar';
import { Spinner } from 'elemental/lib/Elemental';

import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import Event from './event';

class Column extends React.Component {
	constructor() {
		super();

		this.state = {
			events: undefined,
			error: undefined,
			lastModified: undefined,
			interval: undefined
		};
	}

	componentDidMount() {
		document.addEventListener('visibilitychange', this.handleVisibility.bind(this));

		Scrollbar.initialize(this.refs.content, { suppressScrollX: true });

		this.fetchEvents(this.props.details);
		this.startInterval();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.details !== this.props.details) {
			this.fetchEvents(nextProps.details, true);
		}

		if (nextProps.isOnline === true) {
			this.fetchEvents(this.props.details, true);
			this.startInterval();
		}
		else if (nextProps.isOnline === false) {
			this.clearInterval(this.state.interval);
		}
	}

	componentWillUnmount() {
		document.removeEventListener('visibilitychange', this.handleVisibility.bind(this));

		Scrollbar.destroy(this.refs.content);
	}

	componentDidUpdate() {
		Scrollbar.update(this.refs.content);
	}

	handleVisibility() {
		if (document.visibilityState === 'visible' && this.props.isOnline !== false) {
			this.fetchEvents(this.props.details);
		}
	}

	startInterval() {
		let interval = this.setInterval(() => {
			this.fetchEvents(this.props.details);
		}, 60 * 1000);

		this.setState({ interval: interval });
	}

	fetchEvents(details, forceUpdate) {
		fetch(`https://api.github.com/${details.request.prefix}/${details.request.payload}/${details.request.suffix}`, {
			headers: {
				'Authorization': 'token ' + this.props.github.accessToken,
				'User-Agent': 'DevSpace',
				'If-Modified-Since': forceUpdate || this.state.lastModified
			}
		})
		.then(this.fetchParseResponse.bind(this))
		.then(this.fetchHandleResponse.bind(this))
		.catch(this.fetchHandleError.bind(this));
	}

	fetchParseResponse(response) {
		let link = parse(response.headers.get('Link'));

		this.setState({
			lastModified: response.headers.get('Last-Modified')
		});

		if (response.status === 200) {
			return response.json();
		} else if (response.status > 400) {
			throw new Error(response.statusText);
		} else {
			return this.state.events;
		}
	}

	fetchHandleResponse(response) {
		if (response.length > 0) {
			this.setState({
				events: response
			});
		} else {
			this.setError('No public events');
		}
	}

	fetchHandleError(error) {
		this.setError(error.message);
	}

	setError(message) {
		this.setState({
			error: message
		});

		this.clearInterval(this.state.interval);
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