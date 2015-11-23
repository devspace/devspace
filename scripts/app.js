import React from 'react';
import Rebase from 're-base';

import Scrollbar from 'perfect-scrollbar';
import { Spinner } from 'elemental/lib/Elemental';

import Add from './add';
import Column from './column';
import Nav from './nav';

var base = Rebase.createClass('https://devspace-app.firebaseio.com/');

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

		this.fb = base.syncState(`${this.props.auth.id}/columns`, {
			context: this,
			state: 'columns',
			asArray: true
		});

		if (this.props.isFirstLogin) {
			self.setState({
				columns: {
					'0': {
						'icon': 'home',
						'title': 'Home',
						'request': {
							'prefix': 'users',
							'suffix': 'received_events',
							'payload': this.props.auth.username
						}
					},
					'1': {
						'icon': 'person',
						'title': 'User',
						'request': {
							'prefix': 'users',
							'suffix': 'events',
							'payload': this.props.auth.username
						}
					}
				}
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
		this.setState({
			columns: this.state.columns.concat([newColumn])
		});
	}

	removeColumn(key) {
		this.state.columns[key] = null;

		this.setState({
			columns: this.state.columns
		});
	}

	renderColumn(column, key) {
		return <Column key={key} accessToken={this.props.auth.accessToken} removeColumn={this.removeColumn.bind(this, key)} details={column} />;
	}

	renderColumnLoading() {
		return <div className="centered"><Spinner size="md" /></div>
	}

	renderContent() {
		if (this.state.columns) {
			return this.state.columns.map(this.renderColumn.bind(this));
		}
		else {
			return this.renderColumnLoading();
		}
	}

	render() {
		return (
			<div ref="app" className="app">
				<Nav logout={this.props.logout} toggleAddModal={this.toggleAddModal.bind(this)} />
				<div className="app-columns">{this.renderContent()}</div>
				<Add addColumn={this.addColumn.bind(this)} toggleAddModal={this.toggleAddModal.bind(this)} isAddModalOpen={this.state.isAddModalOpen} toggleAddInitialContent={this.toggleAddInitialContent.bind(this)} isAddInitialContent={this.state.isAddInitialContent} />
			</div>
		)
	}
}

export default App;