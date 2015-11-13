var columns = document.querySelector('.columns');
var columnTemplate = document.querySelector('#column-template');
var cardTemplate = document.querySelector('#card-template');

// Auth ------------------------------------------------------------------------

var firebase = new Firebase('https://devspace-io.firebaseio.com');

firebase.authWithOAuthPopup('github', function(error, authData) {
	if (error) {
		console.error('Login Failed!', error);
	}
	else {
        window.accessToken = authData.github.accessToken;

        new Column('a', 'person', 'All events', '/users/' + authData.github.username + '/received_events', 1);
        new Column('b', 'person', 'Your events', '/users/' + authData.github.username + '/events', 1);
        new Column('c', 'repo', 'twbs/bootstrap', '/repos/twbs/bootstrap/events', 1);
        new Column('d', 'organization', 'braziljs', '/orgs/braziljs/events', 1);
	}
}, {
	scope: 'notifications'
});

// Column ----------------------------------------------------------------------

function Column(id, icon, title, endpoint, page) {
    var compiled = Handlebars.compile(columnTemplate.innerHTML);
    var rendered = compiled({
        id: id,
        icon: icon,
        title: title
    });

    columns.innerHTML += rendered;

    loadEvents(id, endpoint, page);
}

// Card ------------------------------------------------------------------------

function loadEvents(id, endpoint, page) {
    fetch('https://api.github.com' + endpoint + '?page=' + page, {
        headers: {
            'Authorization': 'token ' + window.accessToken,
            'User-Agent': 'DevSpace'
        }
    })
    .then(function(response) {
        var hasNext = response.headers.get('Link').indexOf('rel="next"') > 0;

        response.json().then(function(body) {
            var placeholder = document.querySelector('#' + id + ' .placeholder');
            var columnContent = document.querySelector('#' + id + ' .column-content');

            if (body.message) {
                placeholder.innerHTML = body.message + ' :(';
            }
            else {
                for (var i = 0; i < body.length; i++) {
                    body[i].detail = eventDetails(body[i]);
                    body[i].time = moment(body[i].created_at).fromNow();
                }

                var compiled = Handlebars.compile(cardTemplate.innerHTML);
                var rendered = compiled({ events: body });

                columnContent.innerHTML = rendered;

                Ps.initialize(columnContent, {
                    suppressScrollX: true
                });

                var reachedEnd = true;

                columnContent.addEventListener('ps-y-reach-end', function (e) {
                    if (reachedEnd) {
                        loadNext(id, endpoint, 2);
                        reachedEnd = false;
                    }
                });
            }
        });
    })
    .catch(function(e) {
        var placeholder = document.querySelector('#' + id + ' .placeholder');
        placeholder.innerHTML = 'Network failure. Try again later.';
    });
}

function loadNext(id, endpoint, page) {
    fetch('https://api.github.com' + endpoint + '?page=' + page, {
        headers: {
            'Authorization': 'token ' + window.accessToken,
            'User-Agent': 'DevSpace'
        }
    })
    .then(function(response) {
        var hasNext = response.headers.get('Link').indexOf('rel="next"') > 0;

        response.json().then(function(body) {
            var placeholder = document.querySelector('#' + id + ' .placeholder');
            var columnContent = document.querySelector('#' + id + ' .column-content');

            for (var i = 0; i < body.length; i++) {
                body[i].detail = eventDetails(body[i]);
                body[i].time = moment(body[i].created_at).fromNow();
            }

            var compiled = Handlebars.compile(cardTemplate.innerHTML);
            var rendered = compiled({ events: body });

            columnContent.innerHTML += rendered;
            Ps.update(columnContent);
        });

    });
    console.log(id, endpoint, page);
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

// Scrollbar -------------------------------------------------------------------

Ps.initialize(columns, {
    suppressScrollY: true
});