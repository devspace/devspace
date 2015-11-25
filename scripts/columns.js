import React from 'react';
import Rebase from 're-base';

import { Spinner } from 'elemental/lib/Elemental';

import Column from './column';

class Columns extends React.Component {
	constructor() {
		super();

		this.state = {
			responses: []
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps');
		nextProps.columns.map(this.fetchEvents.bind(this));
	}

	fetchEvents(column, index) {
		fetch(`https://api.github.com/${column.request.prefix}/${column.request.payload}/${column.request.suffix}`, {
			headers: {
				'Authorization': 'token ' + this.props.accessToken,
				'User-Agent': 'DevSpace'
			}
		})
		.then((response) => {
			if (response.status === 200) {
				return response.json();
			} else if (response.status > 400) {
				throw new Error(response.statusText);
			} else {
				return this.state.responses[index];
			}
		})
		.then((response) => {
			if (response.length > 0) {
				this.state.responses[index] = response;

				this.setState({
					responses: this.state.responses
				});
			}
		})
		.catch((error) => {
			console.log(error);
		});
	}

	renderLoader() {
		return <div className="centered"><Spinner size="md" /></div>
	}

	renderColumn(column, key) {
		return <Column key={key} responses={this.state.responses[key]} accessToken={this.props.accessToken} removeColumn={this.props.removeColumn.bind(this, key)} details={column} />;
	}

	renderContent() {
		if (this.props.columns) {
			return this.props.columns.map(this.renderColumn.bind(this));
		}
		else {
			return this.renderLoader();
		}
	}

	render() {
		return (
			<div className="app-columns">
				{this.renderContent()}
			</div>
		)
	}
}

export default Columns;