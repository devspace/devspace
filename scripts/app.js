import React from 'react';

import Column from './column';
import Nav from './nav';

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Nav/>
				<div className="columns">
					<Column id="a" icon="person" title="All events" />
					<Column id="b" icon="person" title="Your events" />
					<Column id="c" icon="repo" title="twbs/bootstrap" />
					<Column id="d" icon="organization" title="braziljs" />
				</div>
			</div>
		)
	}
}

export default App;