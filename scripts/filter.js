import React from 'react';

import { Modal, ModalBody, ModalHeader, ModalFooter, FormField, FormInput, Button  } from 'elemental/lib/Elemental';



class Filter extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.isFilterModalOpen !== this.props.isFilterModalOpen,
			nextProps.activeColumn !== this.props.activeColumn;
	}

	handleFilterSubmit(event) {
		event.preventDefault();

		let matching = event.currentTarget.matching.value;
		let excluding = event.currentTarget.excluding.value;

		this.props.setFilter(matching, excluding);
		this.props.toggleFilterModal();
	}

	render() {
		let matching = '';
		let excluding = '';

		if (this.props.activeColumn !== undefined) {
			let column = this.props.columns[this.props.activeColumn];

			if (column && column.filters && column.filters.matching) {
				matching = column.filters.matching;
			}

			if (column && column.filters && column.filters.excluding) {
				excluding = column.filters.excluding;
			}
		}

		return (
   			<Modal isOpen={this.props.isFilterModalOpen} onCancel={this.props.toggleFilterModal} backdropClosesModal>
				<form onSubmit={this.handleFilterSubmit.bind(this)}>
					<ModalHeader>
						<button className="Modal__header__close" onClick={this.props.toggleFilterModal} type="button"></button>
						<h4 className="Modal__header__text">
							<span className="octicon octicon-settings"></span> Filter events
						</h4>
					</ModalHeader>
					<ModalBody>
						<FormField label="Matching" htmlFor="matching">
							<FormInput defaultValue={matching} placeholder="Enter terms to match" name="matching" type="text" />
						</FormField>
						<FormField label="Excluding" htmlFor="excluding">
							<FormInput defaultValue={excluding} placeholder="Enter terms to exclude" name="excluding" type="text" />
						</FormField>
					</ModalBody>
					<ModalFooter>
						<Button type="hollow-primary" submit={true}>
							Save Filter
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		)
	}
}

export default Filter;