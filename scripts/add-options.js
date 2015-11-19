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
				<ModalHeader text="Add column" onClose={this.props.closeAddModal} showCloseButton />
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
				<button type="button" className="add-button" onClick={this.props.openAddForm}>
					<Card className="add-card">
						<span className={"add-icon octicon octicon-" + col.icon}></span>
						<h1 className="add-title">{col.title}</h1>
					</Card>
				</button>
			</Col>
		)
	}
}

export default AddOptions;