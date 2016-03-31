import React from 'react';

import { Button, Spinner } from 'elemental/lib/Elemental';

import Column from './column';

class Columns extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.columns === this.props.columns ||
			nextProps.columnsErrors !== this.props.columnsErrors ||
			nextProps.columnsEvents !== this.props.columnsEvents ||
			nextProps.isFilterModalOpen !== this.props.isFilterModalOpen ||
			nextProps.isOnline !== this.props.isOnline ||
			nextProps.isVisible !== this.props.isVisible;
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
		let error = this.props.columnsErrors && this.props.columnsErrors[key] ? this.props.columnsErrors[key] : undefined;
		let events = this.props.columnsEvents && this.props.columnsEvents[key] ? this.props.columnsEvents[key] : undefined;

		return <Column key={key} index={key} isOnline={this.props.isOnline} isVisible={this.props.isVisible} error={error} events={events} fetchColumn={this.props.fetchColumn.bind(this)} removeColumn={this.props.removeColumn.bind(this, key)} details={column} toggleFilterModal={this.props.toggleFilterModal} isFilterModalOpen={this.props.isFilterModalOpen} />;
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
			<div ref="container" className="columns">
				{this.renderContent()}
			</div>
		)
	}
}

export default Columns;