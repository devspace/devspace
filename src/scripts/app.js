import React from 'react';
import Rebase from 're-base';

import Add from './add';
import Banner from './banner';
import BannerRefresh from './banner-refresh';
import Columns from './columns';
import Filter from './filter';
import Nav from './nav';
import Settings from './settings';

import update from 'react-addons-update';
import request from 'superagent';
import Throttle from 'superagent-throttle';
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
			columnsHasUpdates: undefined,
			isAddInitialContent: true,
			isAddModalOpen: false,
			isFilterModalOpen: false,
			isSettingsModalOpen: false,
			isOnline: undefined,
			isVisible: undefined,
			settings: undefined
		};
	}

	/* ======================================================================
	   Lifecycle
	   ====================================================================== */

	componentDidMount() {
		this.columnsSync = base.syncState(`${this.props.auth.uid}/columns`, {
			context: this,
			state: 'columns',
			asArray: true,
			then: function() {
				this.setState({
					columnsErrors: [],
					columnsEvents: [],
					columnsModified: [],
					columnsHasUpdates: []
				});
			}
		});

		this.settingsSync = base.syncState(`${this.props.auth.uid}/settings`, {
			context: this,
			state: 'settings'
		});

		this.throttle = new Throttle({
			rate: 15,
			concurrent: 15
		});

		document.addEventListener('online', this.handleConnectivity.bind(this));
		document.addEventListener('offline', this.handleConnectivity.bind(this));
		document.addEventListener('visibilitychange', this.handleVisibility.bind(this));

		if (this.props.isFirstLogin) {
			this.handleFirstLogin();
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.columnsSync);
		base.removeBinding(this.settingsSync);

		document.removeEventListener('online', this.handleConnectivity.bind(this));
		document.removeEventListener('offline', this.handleConnectivity.bind(this));
		document.removeEventListener('visibilitychange', this.handleVisibility.bind(this));
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
			],
			settings: {
				columnSize: 'column-medium',
				fontSize: 'font-medium',
				theme: 'dark'
			}
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

	handleAddLink(event) {
		mixpanel.track('Clicked Floating Action Button', {
			title: event.currentTarget.getAttribute('aria-label')
		});

		this.toggleAddModal();
	}

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
	   Settings
	   ====================================================================== */

	toggleSettingsModal() {
		this.setState({
			isSettingsModalOpen: !this.state.isSettingsModalOpen
		});
	}

	setSettings(settings) {
		this.setState({
			settings: settings
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

	fetchColumn(key, page, forceUpdate) {
		let column = this.state.columns[key];
		let lastModified = this.state.columnsModified ? this.state.columnsModified[key] : 0;

		return request
			.get(getURL(column.type, column.payload, this.props.auth.github.username, page))
			.use(this.throttle.plugin)
			.set('Authorization', 'token ' + this.props.auth.github.accessToken)
			.set('If-Modified-Since', forceUpdate || lastModified)
			.end(this.handleResponse.bind(this, key));
	}

	handleResponse(key, error, response) {
		if (response && response.status === 200) {
			this.setLastModified(response.headers['last-modified'], key);
			this.setEvents(response.body, key);
		} else if (response && response.status > 400) {
			this.setError(response.statusText, key);
		} else {
			this.setEvents(this.state.columnsEvents[key], key);
		}
	}

	setLastModified(lastModifiedHeader, key) {
		let newState = update(this.state, {
			columnsModified: {
				[key]: { $set: lastModifiedHeader }
			}
		});

		this.setState(newState);
	}


	setEvents(response, key) {
		if (response && response.length > 0) {
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
		this.state.columnsHasUpdates.splice(key, 1);

		this.setState({
			columns: this.state.columns,
			columnsErrors: this.state.columnsErrors,
			columnsEvents: this.state.columnsEvents,
			columnsModified: this.state.columnsModified,
			columnsHasUpdates: this.state.columnsHasUpdates
		});
	}


	/* ======================================================================
	   New Updates
	   ====================================================================== */

	checkUpdates(key) {
		let column = this.state.columns[key];
		let lastModified = this.state.columnsModified ? this.state.columnsModified[key] : 0;

		return request
			.head(getURL(column.type, column.payload, this.props.auth.github.username, 1))
			.use(this.throttle.plugin)
			.set('Authorization', 'token ' + this.props.auth.github.accessToken)
			.set('If-Modified-Since', lastModified)
			.end((error, response) => {
				if (response && response.status === 200) {
					this.setHasUpdates('appear', key);
				} else {
					this.setHasUpdates(undefined, key);
				}
			});
	}

	setHasUpdates(value, key) {
		let newState = update(this.state, {
			columnsHasUpdates: {
				[key]: { $set: value }
			}
		});

		this.setState(newState);
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

	/* ======================================================================
	   Render
	   ====================================================================== */

	render() {
		var appClassName = "app dark";

		if (this.state.settings) {
			appClassName = `app ${this.state.settings.theme} ${this.state.settings.columnSize} ${this.state.settings.fontSize}`;
		}

		return (
			<div className={appClassName}>
				<BannerRefresh />
				<Banner isOnline={this.state.isOnline} />
				<Nav logout={this.props.logout} toggleSettingsModal={this.toggleSettingsModal.bind(this)} isOnline={this.state.isOnline} isVisible={this.state.isVisible} github={this.props.auth.github} />
				<Settings settings={this.state.settings} setSettings={this.setSettings.bind(this)} isSettingsModalOpen={this.state.isSettingsModalOpen} toggleSettingsModal={this.toggleSettingsModal.bind(this)} />
				<Columns columns={this.state.columns} columnsErrors={this.state.columnsErrors} columnsEvents={this.state.columnsEvents} columnsHasUpdates={this.state.columnsHasUpdates} isOnline={this.state.isOnline} isVisible={this.state.isVisible} fetchColumn={this.fetchColumn.bind(this)} removeColumn={this.removeColumn.bind(this)} toggleAddModal={this.toggleAddModal.bind(this)} toggleFilterModal={this.toggleFilterModal.bind(this)} isFilterModalOpen={this.state.isFilterModalOpen} checkUpdates={this.checkUpdates.bind(this)} setHasUpdates={this.setHasUpdates.bind(this)} />
				<Add columns={this.state.columns} settings={this.state.settings} addColumn={this.addColumn.bind(this)} toggleAddModal={this.toggleAddModal.bind(this)} isAddModalOpen={this.state.isAddModalOpen} toggleAddInitialContent={this.toggleAddInitialContent.bind(this)} isAddInitialContent={this.state.isAddInitialContent} github={this.props.auth.github} />
				<Filter activeColumn={this.state.activeColumn} columns={this.state.columns} isFilterModalOpen={this.state.isFilterModalOpen} toggleFilterModal={this.toggleFilterModal.bind(this)} setFilter={this.setFilter.bind(this)} />
				<a className="fab tooltipped tooltipped-w" onClick={this.handleAddLink.bind(this)} aria-label="Add column">
					<span className="fab-icon octicon octicon-plus"></span>
				</a>
			</div>
		)
	}
}

export default App;