import React from 'react';
import Rebase from 're-base';

import Scrollbar from 'perfect-scrollbar';
import { Button, Spinner } from 'elemental/lib/Elemental';

import Column from './column';

class Columns extends React.Component {
	componentDidMount() {
		Scrollbar.initialize(this.refs.container, { suppressScrollY: true });
	}

	componentDidUpdate() {
		Scrollbar.update(this.refs.container);
	}

	componentWillUnmount() {
		Scrollbar.destroy(this.refs.container);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.isOnline !== this.props.isOnline ||
			nextProps.columns !== this.props.columns;
	}

	renderLoader() {
		return <div className="centered"><Spinner size="md" /></div>
	}

	renderBlank() {
		return (
			<div className="columns-blank centered">
				<span className="columns-blank-icon octicon octicon-squirrel"></span>
				<p className="columns-blank-title">You don't have any columns</p>
				<Button className="columns-blank-btn" size="lg" onClick={this.props.toggleAddModal}>Add a column</Button>
			</div>
		)
	}

	renderColumn(column, key) {
		return <Column key={key} isOnline={this.props.isOnline} accessToken={this.props.accessToken} removeColumn={this.props.removeColumn.bind(this, key)} details={column} />;
	}

	renderContent() {
		if (!this.props.columns) {
			return this.renderLoader();
		}
		else if (this.props.columns.length === 0) {
			return this.renderBlank();
		}
		else if (this.props.columns.length > 0) {
			return this.props.columns.map(this.renderColumn.bind(this));
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