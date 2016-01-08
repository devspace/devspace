exports.icon = function(type) {
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