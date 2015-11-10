var columnContent = document.querySelector('#column-content');
var cardTemplate = document.querySelector('#card-template');

var firebase = new Firebase('https://devspace-io.firebaseio.com');

firebase.authWithOAuthPopup('github', function(error, authData) {
	if (error) {
		console.error('Login Failed!', error);
	}
	else {
		events(authData.github.accessToken);
	}
}, {
	scope: 'notifications'
});

function events(accessToken) {
	fetch('https://api.github.com/users/zenorocha/received_events?access_token=' + accessToken)
		.then(function(response) {
			return response.json();
		})
		.then(function(events) {
			for (var i = 0; i < events.length; i++) {
				events[i].detail = eventDetails(events[i]);
				events[i].time = moment(events[i].created_at).fromNow();
			}

			console.log(events);

			var compiled = Handlebars.compile(cardTemplate.innerHTML);
			var rendered = compiled({ events: events });

			columnContent.innerHTML = rendered;
		});
}

function eventDetails(event) {
	var txt = '';

	switch (event.type) {
        case 'CommitCommentEvent':
            txt = {
            	icon: 'comment-discussion',
            	message: 'commented on a commit at'
        	}
            break;
        case 'CreateEvent':
        	console.log(event.payload);
            txt = {
            	icon: 'repo',
            	message: 'created ' + event.payload.ref_type + (event.payload.ref ? (' ' + event.payload.ref) : '') + ' at'
        	}
            break;
        case 'DeleteEvent':
            txt = {
            	icon: 'repo',
            	message: 'removed ' + event.payload.ref_type + ' ' + event.payload.ref + ' at'
        	}
            break;
        case 'ForkEvent':
            txt = {
            	icon: 'repo-forked',
            	message: 'forked'
        	}
            break;
        case 'GollumEvent':
            txt = {
            	icon: 'book',
            	message: event.payload.pages[0].action + ' the ' + event.payload.pages[0].page_name + ' wiki page at'
        	}
            break;
        case 'IssueCommentEvent':
            txt = {
            	icon: 'comment-discussion',
            	message: 'commented on issue ' + '#' + event.payload.issue.number + ' at'
        	}
            break;
        case 'IssuesEvent':
            txt = {
            	icon: 'issue-opened',
            	message: event.payload.action + ' issue ' + '#' + event.payload.issue.number + ' at'
        	}
            break;
        case 'MemberEvent':
            txt = {
            	icon: 'person',
            	message: 'added ' + '@' + event.payload.member.login + ' as a collaborator to'
        	}
            break;
        case 'PageBuildEvent':
            txt = {
            	icon: 'browser',
            	message: 'builded a GitHub Page at'
        	}
            break;
        case 'PublicEvent':
            txt = {
            	icon: 'megaphone',
            	message: 'open sourced'
        	}
            break;
        case 'PullRequestEvent':
            txt = {
            	icon: 'git-pull-request',
            	message: event.payload.action + ' pull request ' + '#' + event.payload.number + ' at'
        	}
            break;
        case 'PullRequestReviewCommentEvent':
            txt = {
            	icon: 'comment-discussion',
            	message: 'commented on pull request ' + '#' + event.payload.pull_request.number + ' at'
        	}
            break;
        case 'PushEvent':
            txt = {
            	icon: 'git-commit',
            	message: 'pushed ' + event.payload.size + ' commit(s) to'
        	}
            break;
        case 'ReleaseEvent':
            txt = {
            	icon: 'tag',
            	message: 'released ' + event.payload.release.tag_name + ' at'
        	}
            break;
        case 'StatusEvent':
            txt = {
            	icon: 'git-commit',
            	message: 'changed the status of a commit at'
        	}
            break;
        case 'WatchEvent':
            txt = {
            	icon: 'star',
            	message: 'starred'
        	}
            break;
    }

    return txt;
}