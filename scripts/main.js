var columns = document.querySelector('.columns');
var columnContent = document.querySelectorAll('.column-content');
var cardTemplate = document.querySelector('#card-template');
var placeholder = document.querySelectorAll('.placeholder');

Ps.initialize(columns, {
    suppressScrollY: true
});

for (var i = 0; i < columnContent.length; i++) {
    Ps.initialize(columnContent[i], {
        suppressScrollX: true
    });
}

var firebase = new Firebase('https://devspace-io.firebaseio.com');

firebase.authWithOAuthPopup('github', function(error, authData) {
	if (error) {
		console.error('Login Failed!', error);
	}
	else {
		loadEvents(authData.github.accessToken, 0, '/users/' + authData.github.username + '/received_events');
		loadEvents(authData.github.accessToken, 1, '/users/' + authData.github.username + '/events');
		loadEvents(authData.github.accessToken, 2, '/repos/twbs/bootstrap/events');
		loadEvents(authData.github.accessToken, 3, '/orgs/braziljs/events');
	}
}, {
	scope: 'notifications'
});

function loadEvents(accessToken, order, endpoint) {
	fetch('https://api.github.com' + endpoint, {
        headers: {
            'Authorization': 'token ' + accessToken,
            'User-Agent': 'DevSpace'
        }
    })
	.then(function(response) {
		return response.json();
	})
	.then(function(response) {
        if (response.message) {
            placeholder[order].innerHTML = response.message + ' :(';
        }
        else {
			for (var i = 0; i < response.length; i++) {
				response[i].detail = eventDetails(response[i]);
				response[i].time = moment(response[i].created_at).fromNow();
			}

			var compiled = Handlebars.compile(cardTemplate.innerHTML);
			var rendered = compiled({ events: response });

			columnContent[order].innerHTML = rendered;
        }
	})
    .catch(function(e) {
        placeholder[order].innerHTML = 'Network failure. Try again later.';
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