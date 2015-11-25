import React from 'react';
import moment from 'moment';

class Event extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.details !== this.props.details;
	}

	render() {
		var message;
		var icon;
		var avatar = this.props.details.actor.avatar_url;
		var icon = this.props.details.icon;
		var login = this.props.details.actor.login;
		var repo = this.props.details.repo.name;
		var timestamp = this.props.details.created_at;
		var payload = this.props.details.payload;

		switch (this.props.details.type) {
			case 'CommitCommentEvent':
				icon = 'comment-discussion';
				message = (
					<span> commented on a <a className="event-link" href={payload.comment.html_url} onClick={this.props.trackExternalLink} target="_blank">commit</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
			case 'CreateEvent':
				if (payload.ref_type === 'repository') {
					icon = 'repo';
					message = (
						<span> created a new {payload.ref_type} at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
					);
				} else if (payload.ref_type === 'branch') {
					icon = 'git-branch';
					message = (
						<span> created {payload.ref_type} <a className="event-link" href={`https://github.com/${repo}/tree/${payload.ref}`} onClick={this.props.trackExternalLink} target="_blank">{payload.ref}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
					);
				} else if (payload.ref_type === 'tag') {
					icon = 'tag';
					message = (
						<span> created {payload.ref_type} <a className="event-link" href={`https://github.com/${repo}/tree/${payload.ref}`} onClick={this.props.trackExternalLink} target="_blank">{payload.ref}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
					);
				}
				break;
			case 'DeleteEvent':
				if (payload.ref_type === 'branch') {
					icon = 'git-branch';
				} else if (payload.ref_type === 'tag') {
					icon = 'tag';
				}

				message = (
					<span> removed {payload.ref_type} {payload.ref} at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
			case 'ForkEvent':
				icon = 'repo-forked';
				message = (
					<span> forked <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a> to <a className="event-link" href={`https://github.com/${payload.forkee.full_name}`} onClick={this.props.trackExternalLink} target="_blank">{payload.forkee.full_name}</a></span>
				);
				break;
			case 'GollumEvent':
				icon = 'book';
				message = (
					<span> {payload.pages[0].action} a <a className="event-link" href={`https://github.com${payload.pages[0].html_url}`} onClick={this.props.trackExternalLink} target="_blank">wiki page</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
			case 'IssueCommentEvent':
				icon = 'comment-discussion';
				message = (
					<span> commented on issue <a className="event-link" href={payload.comment.html_url} onClick={this.props.trackExternalLink} target="_blank">#{payload.issue.number}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
			case 'IssuesEvent':
				icon = `issue-${payload.action}`;
				message = (
					<span> {payload.action} issue <a className="event-link" href={payload.issue.html_url} onClick={this.props.trackExternalLink} target="_blank">#{payload.issue.number}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
			case 'MemberEvent':
				icon = 'person';
				message = (
					<span> added <a className="event-link" href={`https://github.com/${payload.member.login}`}>{payload.member.login}</a> to <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
			case 'PublicEvent':
				icon = 'megaphone';
				message = (
					<span> open sourced <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
			case 'PullRequestEvent':
				icon = 'git-pull-request';
				message = (
					<span> {payload.action} pull request <a className="event-link" href={payload.pull_request.html_url} onClick={this.props.trackExternalLink} target="_blank">#{payload.number}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
			case 'PullRequestReviewCommentEvent':
				icon = 'comment-discussion';
				message = (
					<span> commented on pull request <a className="event-link" href={payload.comment.html_url} onClick={this.props.trackExternalLink} target="_blank">#{payload.pull_request.number}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				)
				break;
			case 'PushEvent':
				icon = 'code';

				if (payload.size === 1) {
					message = (
						<span> pushed <a className="event-link" href={`https://github.com/${repo}/commit/${payload.commits[0].sha}`} onClick={this.props.trackExternalLink} target="_blank">{payload.size} commit</a> to <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
					);
				} else {
					message = (
						<span> pushed <a className="event-link" href={`https://github.com/${repo}/compare/${payload.before}...${payload.head}`} onClick={this.props.trackExternalLink} target="_blank">{payload.size} commits</a> to <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
					);
				}
				break;
			case 'ReleaseEvent':
				icon = 'tag';
				message = (
					<span> released <a className="event-link" href={payload.release.html_url} onClick={this.props.trackExternalLink} target="_blank">{payload.release.tag_name}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
			case 'StatusEvent':
				icon = 'code';
				message = (
					<span> changed the status of a commit at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
			case 'WatchEvent':
				icon = 'star';
				message = (
					<span> starred <a className="event-link" href={`https://github.com/${repo}`} onClick={this.props.trackExternalLink} target="_blank">{repo}</a></span>
				);
				break;
		}

		return (
			<div className="event">
				<a href={`https://github.com/${login}`} onClick={this.props.trackExternalLink} target="_blank">
					<img className="event-image" src={`${avatar}?s=80`} alt={login} width="40" height="40" />
				</a>
				<div className="event-body">
					<p className="event-text">
						<a className="event-link" href={`https://github.com/${login}`} onClick={this.props.trackExternalLink} target="_blank">
							{login}
						</a>
						{message}
					</p>
					<footer className="event-footer">{moment(timestamp).fromNow()}</footer>
					<span className={`event-icon octicon octicon-${icon}`}></span>
				</div>
			</div>
		)
	}
}

export default Event;