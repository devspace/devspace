module.exports = {
	row1: {
		col1: {
			icon: 'home',
			title: 'Home',
			request: {
				prefix: 'users',
				suffix: 'received_events'
			},
			form: {
				label: 'username',
				placeholder: 'zenorocha'
			}
		},
		col2: {
			icon: 'person',
			title: 'User',
			request: {
				prefix: 'users',
				suffix: 'events'
			},
			form: {
				label: 'username',
				placeholder: 'zenorocha'
			}
		}
	},
	row2: {
		col3: {
			icon: 'repo',
			title: 'Repository',
			request: {
				prefix: 'repos',
				suffix: 'events'
			},
			form: {
				label: 'repository',
				placeholder: 'zenorocha/clipboard.js'
			}
		},
		col4: {
			icon: 'organization',
			title: 'Organization',
			request: {
				prefix: 'orgs',
				suffix: 'events'
			},
			form: {
				label: 'organization',
				placeholder: 'facebook'
			}
		}
	}
};