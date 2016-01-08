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
	}

	return icon;
};

exports.getURL = function(details) {
	return `https://api.github.com/${details.request.prefix}/${details.request.payload}/${details.request.suffix}`;
};