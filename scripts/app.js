import React from 'react';
import Rebase from 're-base';

import Add from './add';
import Column from './column';
import Nav from './nav';

var base = Rebase.createClass('https://devspace-io.firebaseio.com/');

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			columns: {},
			isAddModalOpen: false,
			isAddInitialContent: true
		};
	}

	componentDidMount() {
		base.syncState('columns', {
			context: this,
			state: 'columns'
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

	removeColumn(key) {
		if (confirm('Are you sure you want to remove this column?')) {
			this.state.columns[key] = null;

			this.setState({
				columns: this.state.columns
			});
		}
	}

	renderColumn(key) {
		return <Column key={key} removeColumn={this.removeColumn.bind(this, key)} details={this.state.columns[key]} />;
	}

	render() {
		return (
			<div className="app">
				<Nav logout={this.props.logout} toggleAddModal={this.toggleAddModal.bind(this)} />
				<div className="app-columns">
					{Object.keys(this.state.columns).map(this.renderColumn.bind(this))}
				</div>
				<Add toggleAddModal={this.toggleAddModal.bind(this)} isAddModalOpen={this.state.isAddModalOpen} toggleAddInitialContent={this.toggleAddInitialContent.bind(this)} isAddInitialContent={this.state.isAddInitialContent} />
			</div>
		)
	}
}

export default App;