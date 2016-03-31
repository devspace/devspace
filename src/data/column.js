exports.getIcon = function(type) {
	let icon;

	switch (type) {
		case 'Home':
			icon = 'home';
			break;
		case 'User':
			icon = 'person';
			break;
		case 'Repository':
			icon = 'repo';
			break;
		case 'Organization':
			icon = 'organization';
			break;
		case 'Organization (Private)':
			icon = 'organization';
			break;
	}

	return icon;
};

exports.getURL = function(type, payload, username) {
	let endpoint;

	switch (type) {
		case 'Home':
			endpoint = `users/${payload}/received_events`;
			break;
		case 'User':
			endpoint = `users/${payload}/events`;
			break;
		case 'Repository':
			endpoint = `repos/${payload}/events`;
			break;
		case 'Organization':
			endpoint = `orgs/${payload}/events`;
			break;
		case 'Organization (Private)':
			endpoint = `users/${username}/events/orgs/${payload}`;
			break;
	}

	return `https://api.github.com/${endpoint}`;
};