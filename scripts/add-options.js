import React from 'react';

import { ModalBody, ModalFooter, ModalHeader, Row, Col, Card } from 'elemental/lib/Elemental';

class AddOptions extends React.Component {
	constructor() {
		super();

		this.rows = require('../data/add-rows');
	}

	render() {
		return (
			<div id="addOptions">
				<ModalHeader>
					<button className="Modal__header__close" onClick={this.props.toggleAddModal} type="button"></button>
					<h4 className="Modal__header__text">Add column</h4>
				</ModalHeader>
				<ModalBody>
					{Object.keys(this.rows).map(this.renderRow.bind(this))}
				</ModalBody>
			</div>
		)
	}

	renderRow(rowKey) {
		let row = this.rows[rowKey];

		return (
			<Row key={rowKey}>
				{Object.keys(row).map(this.renderCol.bind(this, rowKey))}
			</Row>
		)
	}

	renderCol(rowKey, colKey) {
		let col = this.rows[rowKey][colKey];

		return (
			<Col key={colKey} sm="1/4">
				<button type="button" className="add-button" onClick={this.handleOption.bind(this, col)}>
					<Card className="add-card">
						<span className={"add-icon octicon octicon-" + col.icon}></span>
						<h1 className="add-title">{col.title}</h1>
					</Card>
				</button>
			</Col>
		)
	}

	handleOption(option) {
		this.props.setSelectedOption(option);
		this.props.toggleAddInitialContent();
	}
}

export default AddOptions;