import React from 'react';

import Add from './add';
import Column from './column';
import Nav from './nav';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			columns: {},
			isAddModalOpen: false
		};
	}

	componentDidMount() {
		this.setState({
			columns : require('../data/app-columns')
		});
	}

	openAddModal() {
		this.setState({
			isAddModalOpen: true
		});
	}

	closeAddModal() {
		this.setState({
			isAddModalOpen: false
		});
	}

	render() {
		return (
			<div className="app">
				<Nav openAddModal={this.openAddModal.bind(this)} />
				<div className="app-columns">
					{Object.keys(this.state.columns).map(this.renderColumn.bind(this))}
				</div>
				<Add closeAddModal={this.closeAddModal.bind(this)} isAddModalOpen={this.state.isAddModalOpen} />
			</div>
		)
	}

	renderColumn(key) {
		return <Column key={key} details={this.state.columns[key]} />;
	}
}

export default App;