import React from 'react';

import Event from './event';

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

	renderEvent(key) {
		return <Event key={key} details={this.state.events[key]} />;
	}

	render() {
		return (
			<section className="column">
				<div className="column-container">
					<header className="column-header">
						<h1 className="column-header-title">
							<span className={"octicon octicon-" + this.props.details.icon}></span>
							{this.props.details.title}
							<span className="octicon octicon-x" onClick={this.props.removeColumn.bind()}></span>
						</h1>
					</header>
					<div className="column-content">
						{Object.keys(this.state.events).map(this.renderEvent.bind(this))}
					</div>
				</div>
			</section>
		)
	}
}

export default Column;