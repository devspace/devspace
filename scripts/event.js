import React from 'react';
import moment from 'moment';

class Event extends React.Component {
	componentWillMount() {
		this.setState({
			avatar: this.props.details.actor.avatar_url,
			icon: this.props.details.icon,
			login: this.props.details.actor.login,
			repo: this.props.details.repo.name,
			timestamp: this.props.details.created_at
		});

		switch (this.props.details.type) {
			case 'CommitCommentEvent':
				this.setState({
					icon: 'comment-discussion',
					message: ' commented on a commit at '
				});
				break;
			case 'CreateEvent':
				let what = (this.props.details.payload.ref ? (' ' + this.props.details.payload.ref) : '');

				this.setState({
					icon: 'repo',
					message: ` created ${this.props.details.payload.ref_type}${what} at `
				});
				break;
			case 'DeleteEvent':
				this.setState({
					icon: 'repo',
					message: ` removed ${this.props.details.payload.ref_type} ${this.props.details.payload.ref} at `
				});
				break;
			case 'ForkEvent':
				this.setState({
					icon: 'repo-forked',
					message: ' forked '
				});
				break;
			case 'GollumEvent':
				this.setState({
					icon: 'book',
					message: ` ${this.props.details.payload.pages[0].action} the ${this.props.details.payload.pages[0].page_name} wiki page at `
				});
				break;
			case 'IssueCommentEvent':
				this.setState({
					icon: 'comment-discussion',
					message: ` commented on issue #${this.props.details.payload.issue.number}  at `
				});
				break;
			case 'IssuesEvent':
				this.setState({
					icon: 'issue-opened',
					message: ` ${this.props.details.payload.action}  issue #${this.props.details.payload.issue.number}  at `
				});
				break;
			case 'MemberEvent':
				this.setState({
					icon: 'person',
					message: ` added @${this.props.details.payload.member.login} as a collaborator to `
				});
				break;
			case 'PageBuildEvent':
				this.setState({
					icon: 'browser',
					message: ` builded a GitHub Page at `
				});
				break;
			case 'PublicEvent':
				this.setState({
					icon: 'megaphone',
					message: ` open sourced `
				});
				break;
			case 'PullRequestEvent':
				this.setState({
					icon: 'git-pull-request',
					message: ` ${this.props.details.payload.action} pull request #${this.props.details.payload.number} at `
				});
				break;
			case 'PullRequestReviewCommentEvent':
				this.setState({
					icon: 'comment-discussion',
					message: ` commented on pull request #${this.props.details.payload.pull_request.number} at `
				});
				break;
			case 'PushEvent':
				this.setState({
					icon: 'code',
					message: ` pushed ${this.props.details.payload.size} commit(s) to `
				});
				break;
			case 'ReleaseEvent':
				this.setState({
					icon: 'tag',
					message: ` released ${this.props.details.payload.release.tag_name} at `
				});
				break;
			case 'StatusEvent':
				this.setState({
					icon: 'code',
					message: ` changed the status of a commit at `
				});
				break;
			case 'WatchEvent':
				this.setState({
					icon: 'star',
					message: ` starred `
				});
				break;
		}
	}

	render() {
		return (
			<div className="event">
				<a href={"https://github.com/" + this.state.login} target="_blank">
					<img className="event-image" src={this.state.avatar + "?s=80"} alt={this.state.login} width="40" height="40" />
				</a>
				<div className="event-body">
					<p className="event-text">
						<a className="event-link" href={"https://github.com/" + this.state.login} target="_blank">
							{this.state.login}
						</a>
						<span>{this.state.message}</span>
						<a className="event-link" href={"https://github.com/" + this.state.repo} target="_blank">
							{this.state.repo}
						</a>
					</p>
					<footer className="event-footer">{moment(this.props.details.created_at).fromNow()}</footer>
					<span className={"event-icon octicon octicon-" + this.state.icon}></span>
				</div>
			</div>
		)
	}
}

export default Event;