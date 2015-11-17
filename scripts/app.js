import React from 'react';

import Column from './column';
import Nav from './nav';
import appData from '../data/app';

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<Nav/>
				<div className="app-columns">
					{appData.columns.map(function(column){
						return <Column key={column.id} icon={column.icon} title={column.title} />;
					})}
				</div>
			</div>
		)
	}
}

export default App;