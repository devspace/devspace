import React from 'react';
import Rebase from 're-base';

import Scrollbar from 'perfect-scrollbar';
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
		var self = this;

		Scrollbar.initialize(this.refs.app, {
			suppressScrollY: true
		});

		this.fb = base.syncState(`${this.props.auth.uid}/columns`, {
			context: this,
			state: 'columns',
			asArray: true
		});

		if (this.props.isFirstLogin) {
			self.setState({
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

	componentDidUpdate() {
		Scrollbar.update(this.refs.app);
	}

	componentWillUnmount() {
		Scrollbar.destroy(this.refs.app);

		base.removeBinding(this.fb);
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

	render() {
		return (
			<div ref="app" className="app">
				<Nav logout={this.props.logout} toggleAddModal={this.toggleAddModal.bind(this)} />
				<Columns columns={this.state.columns} accessToken={this.props.auth.github.accessToken} removeColumn={this.removeColumn.bind(this)} />
				<Add addColumn={this.addColumn.bind(this)} toggleAddModal={this.toggleAddModal.bind(this)} isAddModalOpen={this.state.isAddModalOpen} toggleAddInitialContent={this.toggleAddInitialContent.bind(this)} isAddInitialContent={this.state.isAddInitialContent} />
			</div>
		)
	}
}

export default App;