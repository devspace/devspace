import React from 'react';
import Event from './event';

import data from '../data/app';

class Column extends React.Component {
	render() {
		return (
			<section className="column" id={this.props.id}>
				<div className="column-container">
					<header className="column-header">
						<h1 className="column-header-title">
							<span className={"octicon octicon-" + this.props.icon}></span>
							{this.props.title}
						</h1>
					</header>
					<div className="column-content">
						{data.columns[0].events.map(function(event){
							return <Event key={event.id} login={event.login} avatar={event.avatar} repo={event.repo} time={event.time} icon={event.icon} message={event.message} />;
						})}
					</div>
				</div>
			</section>
		)
	}
}

export default Column;