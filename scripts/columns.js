import React from 'react';
import Rebase from 're-base';

import { Spinner } from 'elemental/lib/Elemental';

import Column from './column';

class Columns extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.columns !== this.props.columns;
	}

	renderLoader() {
		return <div className="centered"><Spinner size="md" /></div>
	}

	renderColumn(column, key) {
		return <Column key={key} accessToken={this.props.accessToken} removeColumn={this.props.removeColumn.bind(this, key)} details={column} />;
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