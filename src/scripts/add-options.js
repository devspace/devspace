import React from 'react';

import { ModalBody, ModalFooter, ModalHeader, Row, Col, Card } from 'elemental/lib/Elemental';

import { getIcon } from '../data/column';
import Icon from './icon';

class AddOptions extends React.Component {
	constructor() {
		super();

		this.rows = require('../data/add-rows');
	}

	shouldComponentUpdate() {
		return false;
	}

	handleOption = option =>{
		this.props.setSelectedOption(option);
		this.props.toggleAddInitialContent();
	}

	renderRow = rowKey => {
		let row = this.rows[rowKey];

		return (
			<Row key={rowKey}>
				{Object.keys(row).map(this.renderCol(rowKey))}
			</Row>
		)
	}

	renderCol = (rowKey, colKey) => {
		let col = this.rows[rowKey][colKey];

		return (
			<Col key={colKey} sm="1/2">
				<button type="button" className="add-button" onClick={this.handleOption(col)}>
					<Card className="add-card">
						<Icon name={getIcon(col.type)} className="add-icon" />
						<h1 className="add-title">{col.type}</h1>
					</Card>
				</button>
			</Col>
		)
	}

	render() {
		return (
			<div id="addOptions">
				<ModalHeader>
					<button className="Modal__header__close" onClick={this.props.toggleAddModal} type="button"></button>
					<h4 className="Modal__header__text">Add column</h4>
				</ModalHeader>
				<ModalBody>
					{Object.keys(this.rows).map(this.renderRow)}
				</ModalBody>
			</div>
		)
	}
}

export default AddOptions;