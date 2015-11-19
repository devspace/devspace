import React from 'react';

import { ModalBody, ModalFooter, ModalHeader, FormField, FormInput, FormIconField, Button } from 'elemental/lib/Elemental';

class AddForm extends React.Component {
	constructor() {
		super();

		this.state = {
			searching: false
		};
	}

	handleSearch() {
		this.setState({ searching: true });

		setTimeout(() => {
			this.setState({ searching: false });
		}, 1000);
	}

	render() {
		return (
			<div id="addOptions">
				<ModalHeader text="Add repository column" onClose={this.props.closeAddModal} showCloseButton />
				<ModalBody>
					<FormField label="Type a repository" htmlFor="input-repo">
						<FormIconField iconPosition="right" iconKey="search" iconColor="default" iconIsLoading={this.state.searching}>
							<FormInput onChange={this.handleSearch.bind(this)} type="text" placeholder="user/repo" name="input-repo" autofocus />
						</FormIconField>
					</FormField>
				</ModalBody>
				<ModalFooter className="add-footer">
					<Button className="add-btn-secondary" type="link-text" onClick={this.props.closeAddForm}>
						<span className="octicon octicon-chevron-left"></span>Back
					</Button>
					<Button className="add-btn-primary" type="hollow-primary">Add Column</Button>
				</ModalFooter>
			</div>
		)
	}
}

export default AddForm;