import * as random from '../data/add-random';

module.exports = {
	row1: {
		col1: {
			title: 'Home',
			request: {
				prefix: 'users',
				suffix: 'received_events'
			},
			form: {
				label: 'username',
				placeholders: random.users,
				pattern: '[0-9A-Za-z_\.-]+'
			}
		},
		col2: {
			title: 'User',
			request: {
				prefix: 'users',
				suffix: 'events'
			},
			form: {
				label: 'username',
				placeholders: random.users,
				pattern: '[0-9A-Za-z_\.-]+'
			}
		}
	},
	row2: {
		col3: {
			title: 'Repository',
			request: {
				prefix: 'repos',
				suffix: 'events'
			},
			form: {
				label: 'repository',
				placeholders: random.repos,
				pattern: '[0-9A-Za-z-]+[\/][0-9A-Za-z_\.-]+'
			}
		},
		col4: {
			title: 'Organization',
			request: {
				prefix: 'orgs',
				suffix: 'events'
			},
			form: {
				label: 'organization',
				placeholders: random.orgs,
				pattern: '[0-9A-Za-z_\.-]+'
			}
		}
	}
};