import * as random from '../data/add-random';

module.exports = {
	row1: {
		col1: {
			type: 'Home',
			form: {
				label: 'username',
				placeholders: random.users,
				pattern: '[0-9A-Za-z_\.-]+'
			}
		},
		col2: {
			type: 'User',
			form: {
				label: 'username',
				placeholders: random.users,
				pattern: '[0-9A-Za-z_\.-]+'
			}
		}
	},
	row2: {
		col3: {
			type: 'Repository',
			form: {
				label: 'repository',
				placeholders: random.repos,
				pattern: '[0-9A-Za-z-]+[\/][0-9A-Za-z_\.-]+'
			}
		},
		col4: {
			type: 'Organization',
			form: {
				label: 'organization',
				placeholders: random.orgs,
				pattern: '[0-9A-Za-z_\.-]+'
			}
		}
	}
};