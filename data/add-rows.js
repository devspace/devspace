module.exports = {
	row1: {
		col1: {
			icon: 'home',
			title: 'Home',
			request: {
				path: {
					prefix: 'users',
					suffix: 'received_events'
				}
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
				path: {
					prefix: 'users',
					suffix: 'events'
				}
			},
			form: {
				label: 'username',
				placeholder: 'zenorocha'
			}
		},
		col3: {
			icon: 'repo',
			title: 'Repository',
			request: {
				path: {
					prefix: 'repos',
					suffix: 'events'
				}
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
				path: {
					prefix: 'orgs',
					suffix: 'events'
				}
			},
			form: {
				label: 'organization',
				placeholder: 'facebook'
			}
		}
	},
	row2: {
		col1: {
			icon: 'code',
			title: 'Commits',
			request: {
				path: {
					prefix: 'commits',
					suffix: 'events'
				}
			},
			form: {
				label: 'repository',
				placeholder: 'zenorocha/clipboard.js'
			}
		},
		col2: {
			icon: 'issue-opened',
			title: 'Issues',
			request: {
				path: {
					prefix: 'issues',
					suffix: 'events'
				}
			},
			form: {
				label: 'repository',
				placeholder: 'zenorocha/clipboard.js'
			}
		},
		col3: {
			icon: 'tag',
			title: 'Releases',
			request: {
				path: {
					prefix: 'tags',
					suffix: 'events'
				}
			},
			form: {
				label: 'repository',
				placeholder: 'zenorocha/clipboard.js'
			}
		},
		col4: {
			icon: 'star',
			title: 'Stars',
			request: {
				path: {
					prefix: 'stars',
					suffix: 'events'
				}
			},
			form: {
				label: 'repository',
				placeholder: 'zenorocha/clipboard.js'
			}
		}
	}
};