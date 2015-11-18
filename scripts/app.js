import React from 'react';

import Column from './column';
import Nav from './nav';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			columns: {}
		};
	}

	componentDidMount() {
		this.setState({
			columns : require('../data/app-columns')
		});
	}

	render() {
		return (
			<div className="app">
				<Nav/>
				<div className="app-columns">
					{Object.keys(this.state.columns).map(this.renderColumn.bind(this))}
				</div>
			</div>
		)
	}

	renderColumn(key) {
		return <Column key={key} details={this.state.columns[key]} />;
	}
}

export default App;