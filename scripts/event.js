import React from 'react';

class Event extends React.Component {
	render() {
		return (
			<div className="event">
				<a href={"https://github.com/" + this.props.details.login} target="_blank">
					<img className="event-image" src={this.props.details.avatar + "?s=80"} alt={this.props.details.login} width="40" height="40" />
				</a>
				<div className="event-body">
					<p className="event-text">
						<a className="event-link" href={"https://github.com/" + this.props.details.login} target="_blank">
							{this.props.details.login}
						</a>
						<span>{this.props.details.message}</span>
						<a className="event-link" href={"https://github.com/" + this.props.details.repo} target="_blank">
							{this.props.details.repo}</a>
					</p>
					<footer className="event-footer">{this.props.details.time}</footer>
					<span className={"event-icon octicon octicon-" + this.props.details.icon}></span>
				</div>
			</div>
		)
	}
}

export default Event;