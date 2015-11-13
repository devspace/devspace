import React from 'react';
import ReactDOM from 'react-dom';

class Column extends React.Component {
	render() {
		return (
			<section id="1" className="column">
				<div className="column-panel">
					<header className="column-header">
						<h1 className="column-header-title">
							<span className="octicon octicon-person"></span> All events
						</h1>
					</header>
					<div className="column-content">
						<div className="placeholder">
							<p className="loading">Loading</p>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Column;