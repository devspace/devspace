import React from 'react';
import Event from './event';

import data from '../data/app-columns';

class Column extends React.Component {
	constructor() {
		super();

		this.state = {
			events: {}
		};
	}

	componentDidMount() {
		this.setState({
			events: this.props.details.events
		});
	}

	render() {
		return (
			<section className="column">
				<div className="column-container">
					<header className="column-header">
						<h1 className="column-header-title">
							<span className={"octicon octicon-" + this.props.details.icon}></span>
							{this.props.details.title}
						</h1>
					</header>
					<div className="column-content">
						{Object.keys(this.state.events).map(this.renderEvent.bind(this))}
					</div>
				</div>
			</section>
		)
	}

	renderEvent(key) {
		return <Event key={key} details={this.state.events[key]} />;
	}
}

export default Column;