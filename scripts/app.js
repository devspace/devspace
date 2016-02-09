import React from 'react';
import Rebase from 're-base';

import { Spinner } from 'elemental/lib/Elemental';

import Add from './add';
import Banner from './banner';
import Columns from './columns';
import Filter from './filter';
import Nav from './nav';

import update from 'react-addons-update';
import request from 'superagent';
import parse from 'parse-link-header';
import { getURL } from '../data/column';

const base = Rebase.createClass('https://devspace-app.firebaseio.com/v1/users');

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			activeColumn: undefined,
			columns: undefined,
			columnsErrors: undefined,
			columnsEvents: undefined,
			columnsModified: undefined,
			isFilterModalOpen: false,
			isAddModalOpen: false,
			isAddInitialContent: true,
			isOnline: undefined,
			isVisible: undefined
		};
	}

	/* ======================================================================
	   Lifecycle
	   ====================================================================== */

	componentDidMount() {
		this.firebaseSync = base.syncState(`${this.props.auth.uid}/columns`, {
			context: this,
			state: 'columns',
			asArray: true,
			then: function() {
				this.setState({
					columnsErrors: [],
					columnsEvents: [],
					columnsModified: []
				});
			}
		});

		window.addEventListener('online', this.handleConnectivity.bind(this));
		window.addEventListener('offline', this.handleConnectivity.bind(this));
		window.addEventListener('visibilitychange', this.handleVisibility.bind(this));

		if (this.props.isFirstLogin) {
			this.handleFirstLogin();
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.firebaseSync);

		window.removeEventListener('online', this.handleConnectivity.bind(this));
		window.removeEventListener('offline', this.handleConnectivity.bind(this));
		window.removeEventListener('visibilitychange', this.handleVisibility.bind(this));
	}

	/* ======================================================================
	   First Login
	   ====================================================================== */

	handleFirstLogin() {
		this.setState({
			columns: [
				{
					'type': 'Home',
					'payload': this.props.auth.github.username
				},
				{
					'type': 'User',
					'payload': this.props.auth.github.username
				}
			]
		});
	}

	/* ======================================================================
	   Status Handlers
	   ====================================================================== */

	handleConnectivity() {
		this.setState({ isOnline: navigator.onLine });

		if (navigator.onLine) {
			setTimeout(() => {
				this.setState({ isOnline: undefined });
			}, 2000);
		}
	}

	handleVisibility() {
		if (this.state.isOnline !== false) {
			if (document.visibilityState === 'visible') {
				this.setState({ isVisible: true });
			}
			else if (document.visibilityState === 'hidden') {
				this.setState({ isVisible: false });
			}

			this.setState({ isVisible: undefined });
		}
		else {
			this.setState({ isVisible: undefined });
		}
	}

	/* ======================================================================
	   Add Modal
	   ====================================================================== */

	toggleAddModal() {
		this.setState({
			isAddModalOpen: !this.state.isAddModalOpen,
			isAddInitialContent: true
		});
	}

	toggleAddInitialContent() {
		this.setState({
			isAddInitialContent: !this.state.isAddInitialContent
		});
	}

	/* ======================================================================
	   Column
	   ====================================================================== */

	addColumn(newColumn) {
		mixpanel.track('Added Column', {
			type: newColumn.type,
			payload: newColumn.payload
		});

		this.setState({ columns: this.state.columns.concat([newColumn]) });
	}

	fetchColumn(key) {
		let column = this.state.columns[key];
		let lastModified = this.state.columnsModified ? this.state.columnsModified[key] : 0;

		return request
			.get(getURL(column.type, column.payload, this.props.auth.github.username))
			.set('Authorization', 'token ' + this.props.auth.github.accessToken)
			.set('If-Modified-Since', lastModified)
			.end(this.handleResponse.bind(this, key));
	}

	handleResponse(key, error, response) {
		if (response && response.status === 200) {
			let newState = update(this.state, {
				columnsModified: {
					[key]: { $set: response.headers['last-modified'] }
				}
			});

			this.setState(newState);

			this.setEvents(response.body, key);
		} else if (response && response.status > 400) {
			this.setError(response.statusText, key);
		} else {
			this.setEvents(this.state.columnsEvents[key], key);
		}
	}

	setEvents(response, key) {
		if (response.length > 0) {
			let newState = update(this.state, {
				columnsEvents: {
					[key]: { $set: response }
				}
			});

			this.setState(newState);
		} else {
			this.setError('No public events', key);
		}
	}

	setError(message, key) {
		let newState = update(this.state, {
			columnsErrors: {
				[key]: { $set: message }
			}
		});

		this.setState(newState);
	}

	removeColumn(key) {
		let column = this.state.columns[key];

		mixpanel.track('Removed Column', {
			type: column.type,
			payload: column.payload
		});

		this.state.columns.splice(key, 1);
		this.state.columnsEvents.splice(key, 1);
		this.state.columnsErrors.splice(key, 1);
		this.state.columnsModified.splice(key, 1);

		this.setState({
			columns: this.state.columns,
			columnsErrors: this.state.columnsErrors,
			columnsEvents: this.state.columnsEvents,
			columnsModified: this.state.columnsModified
		});
	}

	/* ======================================================================
	   Filter
	   ====================================================================== */

	setFilter(matching, excluding, pattern) {
		mixpanel.track('Saved Filter', {
			matching: matching,
			excluding: excluding,
			pattern: pattern,
			columnType: this.state.columns[this.state.activeColumn].type,
			columnPayload: this.state.columns[this.state.activeColumn].payload
		});

		let newState = update(this.state, {
			columns: {
				[this.state.activeColumn]: {
					filters: {
						$set: {
							matching: matching,
							excluding: excluding,
							pattern: pattern
						}
					}
				}
			}
		});

		this.setState(newState);
	}

	toggleFilterModal(index) {
		this.setState({
			activeColumn: index,
			isFilterModalOpen: !this.state.isFilterModalOpen
		});
	}

	render() {
		return (
			<div className="app">
				<Banner isOnline={this.state.isOnline} />
				<Nav logout={this.props.logout} toggleAddModal={this.toggleAddModal.bind(this)} />
				<Columns columns={this.state.columns} columnsErrors={this.state.columnsErrors} columnsEvents={this.state.columnsEvents} isOnline={this.state.isOnline} isVisible={this.state.isVisible} fetchColumn={this.fetchColumn.bind(this)} removeColumn={this.removeColumn.bind(this)} toggleAddModal={this.toggleAddModal.bind(this)} toggleFilterModal={this.toggleFilterModal.bind(this)} isFilterModalOpen={this.state.isFilterModalOpen} />
				<Add addColumn={this.addColumn.bind(this)} toggleAddModal={this.toggleAddModal.bind(this)} isAddModalOpen={this.state.isAddModalOpen} toggleAddInitialContent={this.toggleAddInitialContent.bind(this)} isAddInitialContent={this.state.isAddInitialContent} github={this.props.auth.github} />
				<Filter activeColumn={this.state.activeColumn} columns={this.state.columns} isFilterModalOpen={this.state.isFilterModalOpen} toggleFilterModal={this.toggleFilterModal.bind(this)} setFilter={this.setFilter.bind(this)} />
			</div>
		)
	}
}

export default App;