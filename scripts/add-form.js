import React from 'react';

import { ModalBody, ModalFooter, ModalHeader, FormField, FormInput, FormIconField, Button } from 'elemental/lib/Elemental';

import { icon } from '../data/column';

class AddForm extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	handleSubmit(event) {
		event.preventDefault();

		let column = {
			title: this.props.selectedOption.title,
			request: {
				prefix: this.props.selectedOption.request.prefix,
				suffix: this.props.selectedOption.request.suffix,
				payload: this.refs.payload.value
			}
		};

		this.props.addColumn(column);

		this.props.toggleAddModal();
	}

	getRandomPlaceholder() {
		let array = this.props.selectedOption.form.placeholders;
		let index = Math.floor(Math.random() * array.length);

		return array[index];
	}

	render() {
		return (
			<form id="addForm" onSubmit={this.handleSubmit.bind(this)}>
				<ModalHeader>
					<button className="Modal__header__close" onClick={this.props.toggleAddModal} type="button"></button>
					<h4 className="Modal__header__text">
						<span className={"octicon octicon-" + icon(this.props.selectedOption.title)}></span>
						{this.props.selectedOption.title}
					</h4>
				</ModalHeader>
				<ModalBody>
					<FormField label={`Type a ${this.props.selectedOption.form.label}`} htmlFor="input-repo">
						<input pattern={this.props.selectedOption.form.pattern} className="FormInput" ref="payload" type="text" placeholder={this.getRandomPlaceholder()} name="input-repo" autoFocus required />
					</FormField>
				</ModalBody>
				<ModalFooter className="add-footer">
					<Button className="add-btn-primary" type="hollow-primary" submit={true}>Add Column</Button>
					<Button className="add-btn-secondary" type="link-text" onClick={this.props.toggleAddInitialContent}>
						<span className="octicon octicon-chevron-left"></span>Back
					</Button>
				</ModalFooter>
			</form>
		)
	}
}

export default AddForm;