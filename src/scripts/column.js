import React from 'react';

import { Spinner } from 'elemental/lib/Elemental';

import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import Event from './event';
import { getIcon } from '../data/column';

class Column extends React.Component {
	componentDidMount() {
		this.fetch = this.props.fetchColumn(this.props.index);
		this.startInterval();
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.columns !== this.props.columns ||
			nextProps.error !== this.props.error ||
			nextProps.events !== this.props.events ||
			nextProps.isFilterModalOpen !== this.props.isFilterModalOpen ||
			nextProps.isOnline !== this.props.isOnline ||
			nextProps.isVisible !== this.props.isVisible;
	}

	componentWillUpdate(nextProps) {
		// Error changes
		if (nextProps.error) {
			this.clearInterval(this.interval);
		}

		// Connectivity changes
		if (nextProps.isOnline === true) {
			this.fetch = this.props.fetchColumn(this.props.index);
			this.startInterval();
		}
		else if (nextProps.isOnline === false) {
			this.clearInterval(this.interval);
		}

		// Visibility changes
		if (nextProps.isVisible === true) {
			this.fetch = this.props.fetchColumn(this.props.index);
		}
	}

	componentWillUnmount() {
		this.fetch.abort();
		this.clearInterval(this.interval);
	}

	/* ======================================================================
	   Interval
	   ====================================================================== */

	startInterval() {
		this.interval = this.setInterval(() => {
			this.fetch = this.props.fetchColumn(this.props.index);
		}, 60 * 1000);
	}

	/* ======================================================================
	   Rendering
	   ====================================================================== */

	renderEvent(event, key) {
		return <Event key={key} details={event} filters={this.props.details.filters} />;
	}

	renderLoading() {
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
			return this.renderLoading();
		}
	}

	render() {
		return (
			<section className="column">
				<div className="column-container">
					<header className="column-header">
						<h1 className="column-header-title one-line">
							<span className={"octicon octicon-" + getIcon(this.props.details.type)}></span>
							{this.props.details.payload}
						</h1>
						<a className="column-header-icon column-header-icon-first tooltipped tooltipped-s" onClick={this.props.toggleFilterModal.bind(this, this.props.index)} aria-label="Filter">
							<span className="octicon octicon-settings"></span>
						</a>
						<a className="column-header-icon column-header-icon-second tooltipped tooltipped-s" onClick={this.props.removeColumn.bind(this, this.props.index)} aria-label="Remove">
							<span className="octicon octicon-x"></span>
						</a>
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