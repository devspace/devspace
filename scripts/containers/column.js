'use strict';

import React from 'react';
import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import parse from 'parse-link-header';
import Scrollbar from 'perfect-scrollbar';
import { Spinner } from 'elemental/lib/Elemental';

import Event from '../components/event';

import { connect } from 'react-redux';
import * as actionCreators from '../actions/column';

class Column extends React.Component {
	constructor(props) {
		super(props);
		const { dispatch } = this.props;
	}

	componentDidMount() {
		Scrollbar.initialize(this.refs.content, {
			suppressScrollX: true
		});

		this.fetchEvents(this.props.details);

		let interval = this.setInterval(() => {
			this.fetchEvents(this.props.details);
		}, 60 * 1000);

		this.props.dispatch(
			actionCreators.changeInterval(interval)
		);
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
				'If-Modified-Since': forceUpdate || this.props.lastModified
			}
		})
		.then((response) => {
			let link = parse(response.headers.get('Link'));

			this.props.dispatch(
				actionCreators.changeLastModified(response.headers.get('Last-Modified'))
			);

			if (response.status === 200) {
				return response.json();
			} else if (response.status > 400) {
				throw new Error(response.statusText);
			} else {
				return this.props.events;
			}
		})
		.then((response) => {
			if (response.length > 0) {
				this.props.dispatch(
					actionCreators.changeEvents(response)
				);
			}
			else {
				this.props.dispatch(
					actionCreators.changeError('No public events')
				);

				this.clearInterval(this.props.interval);
			}
		})
		.catch((error) => {
			this.props.dispatch(
				actionCreators.changeError(error.message)
			);

			this.clearInterval(this.props.interval);
		});
	}

	renderEvent(event, key) {
		return <Event key={key} details={this.props.events[key]} />;
	}

	renderEventLoading() {
		return <div className="centered"><Spinner size="md" /></div>;
	}

	renderError() {
		return <div className="column-placeholder centered">{this.props.error}</div>;
	}

	renderContent() {
		if (this.props.events) {
			return this.props.events.map(this.renderEvent.bind(this));
		}
		else if (this.props.error) {
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

function mapStateToProps(state) {
	const { lastModified, interval, error, events } = state.column;
	return {
		lastModified: lastModified,
		interval: interval,
		error: error,
		events: events
	}
}

export default connect(mapStateToProps)(Column);