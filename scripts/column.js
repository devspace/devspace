import React from 'react';

import parse from 'parse-link-header';
import Scrollbar from 'perfect-scrollbar';
import { Spinner } from 'elemental/lib/Elemental';

import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import Event from './event';

class Column extends React.Component {
	componentWillUnmount() {
		Scrollbar.destroy(this.refs.content);
	}

	componentDidUpdate() {
		Scrollbar.update(this.refs.content);
	}

	renderEvent(event, key) {
		return <Event key={key} details={this.props.responses[key]} />;
	}

	renderEventLoading() {
		return <div className="centered"><Spinner size="md" /></div>;
	}

	renderError() {
		return <div className="column-placeholder centered">{this.props.error}</div>;
	}

	renderContent() {
		if (this.props.responses) {
			return this.props.responses.map(this.renderEvent.bind(this));
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

export default Column;