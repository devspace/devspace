import React from 'react';
import Rebase from 're-base';

import { Spinner } from 'elemental/lib/Elemental';

import Add from './add';
import Columns from './columns';
import Nav from './nav';

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

		this.firebaseRef = new Firebase(`https://devspace-app.firebaseio.com/users/${this.props.auth.uid}`)

		if (this.props.isFirstLogin) {
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
	}

	componentWillUnmount() {
		base.removeBinding(this.firebaseSync);
		delete this.firebaseRef;
	}

	toggleAddModal() {
		ga('send', 'event', 'Internal Links', 'Click', 'Toggle Add Modal');

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
		ga('send', 'event', 'Internal Links', 'Click', 'Add Column');

		this.setState({
			columns: this.state.columns.concat([newColumn])
		});
	}

	removeColumn(key) {
		ga('send', 'event', 'Internal Links', 'Click', 'Remove Column');

		let removeColumn = this.state.columns.splice(key, 1);

		this.setState({
			columns: this.state.columns
		});
	}

	handleExternalLink(event) {
		ga('send', 'event', 'External Links', 'Click', event.currentTarget.href);

		this.firebaseRef.child('hits').push({
			href: event.currentTarget.href,
			timestamp: Date.now()
		});
	}

	render() {
		return (
			<div className="app">
				<Nav logout={this.props.logout} toggleAddModal={this.toggleAddModal.bind(this)} handleExternalLink={this.handleExternalLink.bind(this)} />
				<Columns columns={this.state.columns} accessToken={this.props.auth.github.accessToken} removeColumn={this.removeColumn.bind(this)} handleExternalLink={this.handleExternalLink.bind(this)} />
				<Add addColumn={this.addColumn.bind(this)} toggleAddModal={this.toggleAddModal.bind(this)} isAddModalOpen={this.state.isAddModalOpen} toggleAddInitialContent={this.toggleAddInitialContent.bind(this)} isAddInitialContent={this.state.isAddInitialContent} />
			</div>
		)
	}
}

export default App;