import React from 'react';
import Event from './event';

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
						<Event login="zenorocha" avatar="https://avatars.githubusercontent.com/u/398893" repo="zenorocha/clipboard.js" time="6 hours ago" icon="comment-discussion" message=" commented on issue #130 at " />
					</div>
				</div>
			</section>
		)
	}
}

export default Column;