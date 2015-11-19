import React from 'react';

import { Modal } from 'elemental/lib/Elemental';

import AddForm from './add-form';
import AddOptions from './add-options';

class Add extends React.Component {
	renderContent() {
		if (this.props.isAddInitialContent) {
			return <AddOptions toggleAddModal={this.props.toggleAddModal} toggleAddInitialContent={this.props.toggleAddInitialContent} />
		}
		else {
			return <AddForm toggleAddModal={this.props.toggleAddModal} toggleAddInitialContent={this.props.toggleAddInitialContent} />
		}
	}

	render() {
		return (
			<Modal id="add-modal" isOpen={this.props.isAddModalOpen} onCancel={this.props.toggleAddModal} backdropClosesModal>
				{this.renderContent()}
			</Modal>
		)
	}
}

export default Add;