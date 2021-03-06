import React from 'react';

import { Modal, ModalBody, ModalHeader, ModalFooter, FormRow, FormField, FormInput, FormNote, Button  } from 'elemental/lib/Elemental';

import Icon from './icon';

class Filter extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.isFilterModalOpen !== this.props.isFilterModalOpen,
			nextProps.activeColumn !== this.props.activeColumn;
	}

	handleFilterSubmit = event => {
		event.preventDefault();

		let matching = event.currentTarget.matching.value;
		let excluding = event.currentTarget.excluding.value;
		let pattern = event.currentTarget.pattern.value;

		this.props.setFilter(matching, excluding, pattern);
		this.props.toggleFilterModal();
	}

	render() {
		let matching = '';
		let excluding = '';
		let pattern = '';

		if (this.props.activeColumn !== undefined) {
			let column = this.props.columns[this.props.activeColumn];

			if (column && column.filters && column.filters.matching) {
				matching = column.filters.matching;
			}

			if (column && column.filters && column.filters.excluding) {
				excluding = column.filters.excluding;
			}

			if (column && column.filters && column.filters.pattern) {
				pattern = column.filters.pattern;
			}
		}

		return (
   			<Modal isOpen={this.props.isFilterModalOpen} onCancel={this.props.toggleFilterModal} backdropClosesModal>
				<form onSubmit={this.handleFilterSubmit}>
					<ModalHeader>
						<button className="Modal__header__close" onClick={this.props.toggleFilterModal} type="button"></button>
						<h4 className="Modal__header__text">
							<Icon name="settings" /> Filter events
						</h4>
					</ModalHeader>
					<ModalBody>
						<FormRow>
							<FormField width="one-half" label="Matching" htmlFor="matching">
								<FormInput defaultValue={matching} placeholder="commented" name="matching" type="text" />
							</FormField>
							<FormField width="one-half" label="Excluding" htmlFor="excluding">
								<FormInput defaultValue={excluding} placeholder="added, yourbot" name="excluding" type="text" />
							</FormField>
						</FormRow>
						<FormField label="Pattern" htmlFor="pattern">
							<FormInput defaultValue={pattern} placeholder="/(starred)/g" name="pattern" type="text" />
						</FormField>
						<FormNote>
							A pattern regex overrides matching and excluding fields
						</FormNote>
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
