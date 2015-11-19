import React from 'react';

import { Modal } from 'elemental/lib/Elemental';

import AddForm from './add-form';
import AddOptions from './add-options';

class Add extends React.Component {
	constructor() {
		super();

		this.state = {
			isAddFormOpen: false
		};
	}

	openAddForm() {
		this.setState({
			isAddFormOpen: true
		});
	}

	closeAddForm() {
		this.setState({
			isAddFormOpen: false
		});
	}

	renderForm() {
		if (!this.state.isAddFormOpen) return;

		return <AddForm closeAddForm={this.closeAddForm.bind(this)} closeAddModal={this.props.closeAddModal} />
	}

	renderOptions() {
		if (this.state.isAddFormOpen) return;

		return <AddOptions openAddForm={this.openAddForm.bind(this)} closeAddModal={this.props.closeAddModal} />
	}

	render() {
		return (
			<Modal id="add-modal" isOpen={this.props.isAddModalOpen} onCancel={this.props.closeAddModal} backdropClosesModal>
				{this.renderForm()}
				{this.renderOptions()}
			</Modal>
		)
	}
}

export default Add;