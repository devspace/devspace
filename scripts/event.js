import React from 'react';

class Event extends React.Component {
	render() {
		return (
			<div className="card">
				<a href={"https://github.com/" + this.props.login} target="_blank">
					<img className="card-image" src={this.props.avatar + "s=80"} alt={this.props.login} width="40" height="40" />
				</a>
				<div className="card-body">
					<p><a href={"https://github.com/" + this.props.login} target="_blank">{this.props.login}</a>
					<span>{this.props.message}</span>
					<a href={"https://github.com/" + this.props.repo} target="_blank">{this.props.repo}</a></p>
					<footer className="card-footer">{this.props.time}</footer>
					<span className={"octicon octicon-" + this.props.icon}></span>
				</div>
			</div>
		)
	}
}

export default Event;