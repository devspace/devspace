'use strict';

import React from 'react';
import Rebase from 're-base';

import Scrollbar from 'perfect-scrollbar';
import { Spinner } from 'elemental/lib/Elemental';

import Column from '../containers/column';

class Columns extends React.Component {
	componentDidMount() {
		Scrollbar.initialize(this.refs.container, {
			suppressScrollY: true
		});
	}

	componentDidUpdate() {
		Scrollbar.update(this.refs.container);
	}

	componentWillUnmount() {
		Scrollbar.destroy(this.refs.container);
	}

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
			<div className="columns" ref="container">
				{this.renderContent()}
			</div>
		)
	}
}

export default Columns;