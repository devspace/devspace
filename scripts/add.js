import React from 'react';

import { Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Card } from 'elemental/lib/Elemental';

class Add extends React.Component {
	constructor() {
		super();

		this.rows = require('../data/add-rows');
	}

	render() {
		return (
			<Modal isOpen={this.props.isAddModalOpen} onCancel={this.props.closeAddModal} backdropClosesModal>
				<ModalHeader text="Add column" onClose={this.props.closeAddModal} showCloseButton />
				<ModalBody>{Object.keys(this.rows).map(this.renderRow.bind(this))}</ModalBody>
			</Modal>
		)
	}

	renderRow(rowKey) {
		var row = this.rows[rowKey];

		return (
			<Row key={rowKey}>
				{Object.keys(row).map(this.renderCol.bind(this, rowKey))}
			</Row>
		)
	}

	renderCol(rowKey, colKey) {
		var col = this.rows[rowKey][colKey];

		return (
			<Col key={colKey} sm="1/4">
				<button type="button" className="add-button">
					<Card className="add-card">
						<span className={"add-icon octicon octicon-" + col.icon}></span>
						<h1 className="add-title">{col.title}</h1>
					</Card>
				</button>
			</Col>
		)
	}
}

export default Add;