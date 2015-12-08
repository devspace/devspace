'use strict';

import React from 'react';
import Rebase from 're-base';

import { Spinner } from 'elemental/lib/Elemental';

import Add from './add';
import Columns from '../components/columns';
import Nav from '../components/nav';

var base = Rebase.createClass('https://devspace-app.firebaseio.com/users');

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			columns: [],
			isAddModalOpen: false,
			isAddInitialContent: true
		};
	}

	componentDidMount() {
		this.firebaseSync = base.syncState(`${this.props.auth.uid}/columns`, {
			context: this,
			state: 'columns',
			asArray: true
		});

		if (this.props.isFirstLogin) {
			this.handleFirstLogin();
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.firebaseSync);
	}

	handleFirstLogin() {
		this.setState({
			columns: [
				{
					'icon': 'home',
					'title': 'Home',
					'request': {
						'prefix': 'users',
						'suffix': 'received_events',
						'payload': this.props.auth.github.username
					}
				},
				{
					'icon': 'person',
					'title': 'User',
					'request': {
						'prefix': 'users',
						'suffix': 'events',
						'payload': this.props.auth.github.username
					}
				}
			]
		});
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

	addColumn(newColumn) {
		mixpanel.track('Added Column', {
			title: newColumn.title,
			request: `${newColumn.request.prefix}/${newColumn.request.payload}/${newColumn.request.suffix}`
		});

		this.setState({
			columns: this.state.columns.concat([newColumn])
		});
	}

	removeColumn(key) {
		let column = this.state.columns[key];

		mixpanel.track('Removed Column', {
			title: column.title,
			request: `${column.request.prefix}/${column.request.payload}/${column.request.suffix}`
		});

		this.state.columns.splice(key, 1);

		this.setState({
			columns: this.state.columns
		});
	}

	render() {
		return (
			<div className="app">
				<Nav logout={this.props.logout} toggleAddModal={this.toggleAddModal.bind(this)} />
				<Columns columns={this.state.columns} accessToken={this.props.auth.github.accessToken} removeColumn={this.removeColumn.bind(this)} />
				<Add addColumn={this.addColumn.bind(this)} toggleAddModal={this.toggleAddModal.bind(this)} isAddModalOpen={this.state.isAddModalOpen} toggleAddInitialContent={this.toggleAddInitialContent.bind(this)} isAddInitialContent={this.state.isAddInitialContent} />
			</div>
		)
	}
}

export default App;