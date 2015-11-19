import React from 'react';

import Add from './add';
import Column from './column';
import Nav from './nav';

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
		this.setState({
			columns : require('../data/app-columns')
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

	render() {
		return (
			<div className="app">
				<Nav toggleAddModal={this.toggleAddModal.bind(this)} />
				<div className="app-columns">
					{Object.keys(this.state.columns).map(this.renderColumn.bind(this))}
				</div>
				<Add toggleAddModal={this.toggleAddModal.bind(this)} isAddModalOpen={this.state.isAddModalOpen} toggleAddInitialContent={this.toggleAddInitialContent.bind(this)} isAddInitialContent={this.state.isAddInitialContent} />
			</div>
		)
	}

	renderColumn(key) {
		return <Column key={key} details={this.state.columns[key]} />;
	}
}

export default App;