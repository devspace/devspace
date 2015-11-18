import React from 'react';

import { Row, Col, Card } from 'elemental/lib/Elemental';

class Add extends React.Component {
	constructor() {
		super();

		this.rows = require('../data/add-rows');
	}

	render() {
		return (
			<div className="add">
				{Object.keys(this.rows).map(this.renderRow.bind(this))}
			</div>
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