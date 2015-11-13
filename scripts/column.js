var React = require('react');
var ReactDOM = require('react-dom');

var Column = React.createClass({
	render: function() {
		var id = 1;
		var icon = 'person';
		var title = 'All events';

		return (
			<section id="{id}" className="column">
				<div className="column-panel">
					<header className="column-header">
						<h1 className="column-header-title">
							<span className="octicon octicon-{icon}"></span> {title}
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
});

ReactDOM.render(<Column/>, document.querySelector('.columns'));
