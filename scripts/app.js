import React from 'react';
import ReactDOM from 'react-dom';
import Column from './column';
import Nav from './nav';

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Nav/>
				<div className="columns"><Column/></div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.querySelector('#wrapper'));
