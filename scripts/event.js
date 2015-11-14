import React from 'react';

class Event extends React.Component {
	render() {
		return (
			<div className="event">
				<a href={"https://github.com/" + this.props.login} target="_blank">
					<img className="event-image" src={this.props.avatar + "s=80"} alt={this.props.login} width="40" height="40" />
				</a>
				<div className="event-body">
					<p className="event-text">
						<a className="event-link" href={"https://github.com/" + this.props.login} target="_blank">
							{this.props.login}
						</a>
						<span>{this.props.message}</span>
						<a className="event-link" href={"https://github.com/" + this.props.repo} target="_blank">
							{this.props.repo}</a>
					</p>
					<footer className="event-footer">{this.props.time}</footer>
					<span className={"event-icon octicon octicon-" + this.props.icon}></span>
				</div>
			</div>
		)
	}
}

export default Event;