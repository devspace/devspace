import React from 'react';
import TimeAgo from 'react-timeago';

import _words from 'lodash.words';
import _indexOf from 'lodash.indexof';

class Event extends React.Component {
	trackLink(event) {
		mixpanel.track('Clicked Event', {
			type: this.props.details.type,
			href: event.currentTarget.href
		});
	}

	/* Formatting
	   ====================================================================== */

	formatEvent(details) {
		var branch, messageHtml, messageString;
		var avatar = details.actor.avatar_url;
		var icon = details.icon;
		var login = details.actor.login;
		var payload = details.payload;
		var repo = details.repo.name;
		var timestamp = details.created_at;

		switch (details.type) {
			case 'CommitCommentEvent':
				icon = 'comment-discussion';
				messageString = `${login} commented on a commit at ${repo}`;
				messageHtml = (
					<span> commented on a <a className="event-link" href={payload.comment.html_url} onClick={this.trackLink.bind(this)} target="_blank">commit</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
			case 'CreateEvent':
				if (payload.ref_type === 'repository') {
					icon = 'repo';
					messageString = `${login} created a new ${payload.ref_type} at ${repo}`;
					messageHtml = (
						<span> created a new {payload.ref_type} at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
					);
				} else if (payload.ref_type === 'branch') {
					icon = 'git-branch';
					messageString = `${login} created ${payload.ref_type} ${payload.ref} at ${repo}`;
					messageHtml = (
						<span> created {payload.ref_type} <a className="event-link" href={`https://github.com/${repo}/tree/${payload.ref}`} onClick={this.trackLink.bind(this)} target="_blank">{payload.ref}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
					);
				} else if (payload.ref_type === 'tag') {
					icon = 'tag';
					messageString = `${login} created ${payload.ref_type} ${payload.ref} at ${repo}`;
					messageHtml = (
						<span> created {payload.ref_type} <a className="event-link" href={`https://github.com/${repo}/tree/${payload.ref}`} onClick={this.trackLink.bind(this)} target="_blank">{payload.ref}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
					);
				}
				break;
			case 'DeleteEvent':
				if (payload.ref_type === 'branch') {
					icon = 'git-branch';
				} else if (payload.ref_type === 'tag') {
					icon = 'tag';
				}

				messageString = `${login} removed ${payload.ref_type} ${payload.ref} at ${repo}`;
				messageHtml = (
					<span> removed {payload.ref_type} {payload.ref} at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
			case 'ForkEvent':
				icon = 'repo-forked';
				messageString = `${login} forked ${repo} to ${payload.forkee.full_name}`;
				messageHtml = (
					<span> forked <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a> to <a className="event-link" href={`https://github.com/${payload.forkee.full_name}`} onClick={this.trackLink.bind(this)} target="_blank">{payload.forkee.full_name}</a></span>
				);
				break;
			case 'GollumEvent':
				icon = 'book';
				messageString = `${login} ${payload.pages[0].action} a wiki page at ${repo}`;
				messageHtml = (
					<span> {payload.pages[0].action} a <a className="event-link" href={`https://github.com${payload.pages[0].html_url}`} onClick={this.trackLink.bind(this)} target="_blank">wiki page</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
			case 'IssueCommentEvent':
				icon = 'comment-discussion';
				messageString = `${login} commented on issue #${payload.issue.number} at ${repo}`;
				messageHtml = (
					<span> commented on issue <a className="event-link" href={payload.comment.html_url} onClick={this.trackLink.bind(this)} target="_blank">#{payload.issue.number}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
			case 'IssuesEvent':
				icon = `issue-${payload.action}`;
				messageString = `${login} ${payload.action} issue #${payload.issue.number} at ${repo}`;
				messageHtml = (
					<span> {payload.action} issue <a className="event-link" href={payload.issue.html_url} onClick={this.trackLink.bind(this)} target="_blank">#{payload.issue.number}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
			case 'MemberEvent':
				icon = 'person';
				messageString = `${login} added ${payload.member.login} to ${repo}`;
				messageHtml = (
					<span> added <a className="event-link" href={`https://github.com/${payload.member.login}`} onClick={this.trackLink.bind(this)} target="_blank">{payload.member.login}</a> to <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
			case 'PublicEvent':
				icon = 'megaphone';
				messageString = `${login} open sourced ${repo}`;
				messageHtml = (
					<span> open sourced <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
			case 'PullRequestEvent':
				icon = 'git-pull-request';
				messageString = `${login} ${payload.action} pull request #${payload.number} at ${repo}`;
				messageHtml = (
					<span> {payload.action} pull request <a className="event-link" href={payload.pull_request.html_url} onClick={this.trackLink.bind(this)} target="_blank">#{payload.number}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
			case 'PullRequestReviewCommentEvent':
				icon = 'comment-discussion';
				messageString = `${login} commented on pull request #${payload.pull_request.number} at ${repo}`;
				messageHtml = (
					<span> commented on pull request <a className="event-link" href={payload.comment.html_url} onClick={this.trackLink.bind(this)} target="_blank">#{payload.pull_request.number}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				)
				break;
			case 'PushEvent':
				icon = 'code';
				branch = payload.ref.substr(11);

				if (payload.size === 1) {
					messageString = `${login} pushed ${payload.size} commit to ${branch} at ${repo}`;
					messageHtml = (
						<span> pushed <a className="event-link" href={`https://github.com/${repo}/commit/${payload.commits[0].sha}`} onClick={this.trackLink.bind(this)} target="_blank">{payload.size} commit</a> to <a className="event-link" href={`https://github.com/${repo}/tree/${branch}`} onClick={this.trackLink.bind(this)} target="_blank">{branch}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
					);
				} else {
					messageString = `${login} pushed ${payload.size} commits to ${branch} at ${repo}`;
					messageHtml = (
						<span> pushed <a className="event-link" href={`https://github.com/${repo}/compare/${payload.before}...${payload.head}`} onClick={this.trackLink.bind(this)} target="_blank">{payload.size} commits</a> to <a className="event-link" href={`https://github.com/${repo}/tree/${branch}`} onClick={this.trackLink.bind(this)} target="_blank">{branch}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
					);
				}
				break;
			case 'ReleaseEvent':
				icon = 'tag';
				messageString = `${login} released ${payload.release.tag_name} at ${repo}`;
				messageHtml = (
					<span> released <a className="event-link" href={payload.release.html_url} onClick={this.trackLink.bind(this)} target="_blank">{payload.release.tag_name}</a> at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
			case 'StatusEvent':
				icon = 'code';
				messageString = `${login} changed the status of a commit at ${repo}`;
				messageHtml = (
					<span> changed the status of a commit at <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
			case 'WatchEvent':
				icon = 'star';
				messageString = `${login} starred ${repo}`;
				messageHtml = (
					<span> starred <a className="event-link" href={`https://github.com/${repo}`} onClick={this.trackLink.bind(this)} target="_blank">{repo}</a></span>
				);
				break;
		}

		return {
			avatar: avatar,
			icon: icon,
			login: login,
			messageHtml: messageHtml,
			messageString: messageString,
			timestamp: timestamp
		}
	}

	formatPattern(pattern) {
		let regex;
		let regexParts = pattern.match(/^\/(.*?)\/([gim]*)$/);

		// Check if the parsed pattern has delimiters and modifiers
		if (regexParts) {
		    regex = new RegExp(regexParts[1], regexParts[2]);
		} else {
		    regex = new RegExp(pattern, 'g');
		}

		return regex;
	}

	/* Filters
	   ========================================================================== */

	filterPattern(content, filter) {
		let hasFound = false;
		let regex = this.formatPattern(filter);

		if (content.search(regex) !== -1) {
			return true;
		}

		return hasFound;
	}

	filterGeneric(content, filter) {
		let hasFound = false;
		let words = _words([filter.toLowerCase()], /[0-9A-Za-z_#\.\-\/]+/g);

		for (var i = 0; i < words.length; i++) {
			if (content.toLowerCase().indexOf(words[i]) !== -1) {
				hasFound = true;
			}
		}

		return hasFound;
	}

	/* Rendering
	   ====================================================================== */

	renderEvent(event) {
		return (
			<div className="event">
				<a href={`https://github.com/${event.login}`} onClick={this.trackLink.bind(this)} target="_blank">
					<img className="event-image" src={`${event.avatar}?s=80`} alt={event.login} width="40" height="40" />
				</a>
				<div className="event-body">
					<p className="event-text">
						<a className="event-link" href={`https://github.com/${event.login}`} onClick={this.trackLink.bind(this)} target="_blank">
							{event.login}
						</a>
						{event.messageHtml}
					</p>
					<footer className="event-footer">
						<TimeAgo date={event.timestamp} />
					</footer>
					<span className={`event-icon octicon octicon-${event.icon}`}></span>
				</div>
			</div>
		)
	}

	render() {
		let event = this.formatEvent(this.props.details);
		let filters = this.props.filters;

		if (filters && filters.pattern) {
			let hasPattern = this.filterPattern(event.messageString, filters.pattern);

			if (hasPattern === false) {
				return <span></span>;
			}
		}
		else {
			let hasMatching, hasExcluding;

			if (filters && filters.matching) {
				hasMatching = this.filterGeneric(event.messageString, filters.matching);
			}

			if (filters && filters.excluding) {
				hasExcluding = this.filterGeneric(event.messageString, filters.excluding);
			}

			if (hasMatching === false || hasExcluding === true) {
				return <span></span>;
			}
		}

		return this.renderEvent(event);
	}
}

export default Event;