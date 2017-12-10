import React from 'react';

import { Button, Spinner } from 'elemental/lib/Elemental';

import Column from './column';
import Icon from './icon';

class Columns extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.columns === this.props.columns ||
			nextProps.columnsErrors !== this.props.columnsErrors ||
			nextProps.columnsEvents !== this.props.columnsEvents ||
			nextProps.columnsHasUpdates !== this.props.columnsHasUpdates ||
			nextProps.isFilterModalOpen !== this.props.isFilterModalOpen ||
			nextProps.isOnline !== this.props.isOnline ||
			nextProps.isVisible !== this.props.isVisible;
	}

	renderLoader = () => {
		return <div className="centered"><Spinner size="md" /></div>
	}

	renderBlank = () => {
		return (
			<div className="columns-blank centered">
				<Icon name="squirrel" className="columns-blank-icon" />
				<p className="columns-blank-title">You do not have any columns</p>
				<Button className="columns-blank-btn" size="lg" onClick={this.props.toggleAddModal}>Add a column</Button>
			</div>
		)
	}

	renderColumn = (column, key) => {
		let error = this.props.columnsErrors && this.props.columnsErrors[key] ? this.props.columnsErrors[key] : undefined;
		let events = this.props.columnsEvents && this.props.columnsEvents[key] ? this.props.columnsEvents[key] : undefined;
		let hasUpdates = this.props.columnsHasUpdates && this.props.columnsHasUpdates[key] ? this.props.columnsHasUpdates[key] : undefined;

		return <Column key={key} index={key} isOnline={this.props.isOnline} isVisible={this.props.isVisible} error={error} events={events} hasUpdates={hasUpdates} fetchColumn={this.props.fetchColumn} removeColumn={this.props.removeColumn.bind(this, key)} details={column} toggleFilterModal={this.props.toggleFilterModal} isFilterModalOpen={this.props.isFilterModalOpen} checkUpdates={this.props.checkUpdates} setHasUpdates={this.props.setHasUpdates} />;
	}

	renderContent = () => {
		if (!this.props.columns) {
			return this.renderLoader();
		}
		else if (this.props.columns.length === 0) {
			return this.renderBlank();
		}
		else if (this.props.columns.length > 0) {
			return this.props.columns.map(this.renderColumn());
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