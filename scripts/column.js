import React from 'react';

class Column extends React.Component {
	render() {
		return (
			<section id={this.props.id} className="column">
				<div className="column-panel">
					<header className="column-header">
						<h1 className="column-header-title">
							<span className={"octicon octicon-" + this.props.icon}></span>
							{this.props.title}
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