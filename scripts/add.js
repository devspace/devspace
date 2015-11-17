import React from 'react';
import reactMixin from 'react-mixin';
import { History } from 'react-router';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'elemental/lib/Elemental';

class Add extends React.Component {
	goBack() {
		this.history.pushState(null, '/app');
	}

	render() {
		return (
			<Modal isOpen={true} onCancel={this.goBack.bind(this)} backdropClosesModal>
				<ModalHeader text="Add column" showCloseButton onClose={this.goBack.bind(this)} />
				<ModalBody>qwe</ModalBody>
			</Modal>
		)
	}
}

reactMixin.onClass(Add, History);

export default Add;