import React from 'react';
import Rebase from 're-base';

import { Spinner } from 'elemental/lib/Elemental';

import Add from './add';
import Banner from './banner';
import Columns from './columns';
import Nav from './nav';

var base = Rebase.createClass('https://devspace-app.firebaseio.com/v1/users');

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			columns: undefined,
			isOnline: undefined,
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

		window.addEventListener('online',  this.handleOnlineStatus.bind(this));
		window.addEventListener('offline',  this.handleOnlineStatus.bind(this));

		if (this.props.isFirstLogin) {
			this.handleFirstLogin();
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.firebaseSync);

		window.removeEventListener('online',  this.handleOnlineStatus.bind(this));
		window.removeEventListener('offline',  this.handleOnlineStatus.bind(this));
	}

	handleOnlineStatus() {
		this.setState({ isOnline: navigator.onLine });

		if (navigator.onLine) {
			setTimeout(() => {
				this.setState({ isOnline: undefined });
			}, 2000);
		}
	}

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
			type: newColumn.type,
			payload: newColumn.payload
		});

		this.setState({ columns: this.state.columns.concat([newColumn]) });
	}

	removeColumn(key) {
		let column = this.state.columns[key];

		mixpanel.track('Removed Column', {
			type: column.type,
			payload: column.payload
		});

		this.state.columns.splice(key, 1);

		this.setState({ columns: this.state.columns });
	}

	render() {
		return (
			<div className="app">
				<Banner isOnline={this.state.isOnline} />
				<Nav logout={this.props.logout} toggleAddModal={this.toggleAddModal.bind(this)} />
				<Columns isOnline={this.state.isOnline} columns={this.state.columns} github={this.props.auth.github} removeColumn={this.removeColumn.bind(this)} toggleAddModal={this.toggleAddModal.bind(this)} />
				<Add addColumn={this.addColumn.bind(this)} toggleAddModal={this.toggleAddModal.bind(this)} isAddModalOpen={this.state.isAddModalOpen} toggleAddInitialContent={this.toggleAddInitialContent.bind(this)} isAddInitialContent={this.state.isAddInitialContent} />
			</div>
		)
	}
}

export default App;