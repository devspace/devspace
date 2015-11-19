import React from 'react';

import { ModalBody, ModalFooter, ModalHeader, FormField, FormInput, FormIconField, Button } from 'elemental/lib/Elemental';

class AddForm extends React.Component {
	constructor() {
		super();

		this.state = {
			loading: false
		};
	}

	handleSubmit(event) {
		event.preventDefault();

		this.setState({ loading: true });

		setTimeout(() => {
			this.setState({ loading: false });
			this.props.toggleAddModal();
		}, 1000);
	}

	render() {
		return (
			<form id="addForm" onSubmit={this.handleSubmit.bind(this)}>
				<ModalHeader text="Add repository column" onClose={this.props.toggleAddModal} showCloseButton />
				<ModalBody>
					<FormField label="Type a repository" htmlFor="input-repo">
						<FormIconField iconPosition="right" iconKey="search" iconColor="default" iconIsLoading={this.state.loading}>
							<FormInput type="text" placeholder="user/repo" name="input-repo" autofocus />
						</FormIconField>
					</FormField>
				</ModalBody>
				<ModalFooter className="add-footer">
					<Button className="add-btn-secondary" type="link-text" onClick={this.props.toggleAddInitialContent}>
						<span className="octicon octicon-chevron-left"></span>Back
					</Button>
					<Button className="add-btn-primary" type="hollow-primary" submit={true}>Add Column</Button>
				</ModalFooter>
			</form>
		)
	}
}

export default AddForm;