import React from 'react';

import request from 'superagent';
import { ModalBody, ModalFooter, ModalHeader, FormField, FormInput, FormNote, FormIconField, Button, Spinner } from 'elemental/lib/Elemental';

import { getIcon } from '../data/column';
import Icon from './icon';

class AddForm extends React.Component {
	constructor() {
		super();

		this.state = {
			checkingOrgMembership: false
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.columns !== this.props.columns ||
			nextState.checkingOrgMembership !== this.state.checkingOrgMembership;
	}

	checkOrgMembership(payload) {
		return new Promise((resolve, reject) => {
			if (this.props.selectedOption.type !== 'Organization') {
				resolve(this.props.selectedOption.type);
			} else {
				this.setState({
					checkingOrgMembership: true
				});

				request
					.get(`https://api.github.com/orgs/${payload}/members/${this.props.github.username}`)
					.set('Authorization', 'token ' + this.props.github.accessToken)
					.end((error, response) => {
						if (error) {
							resolve('Organization');
						} else {
							this.setState({
								checkingOrgMembership: false
							});

							// If user logged with public access
							if (response.headers['x-oauth-scopes'].indexOf('public') !== -1) {
								resolve('Organization');
							}

							// If user belongs to that organization
							if (response.status === 204 || response.status === 302) {
								resolve('Organization (Private)');
							} else {
								resolve('Organization');
							}
						}
					});
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.props.columns.length < 10) {
			this.checkOrgMembership(this.refs.payload.value).then((type) => {
				this.props.addColumn({
					type: type,
					payload: this.refs.payload.value
				});

				this.props.toggleAddModal();
			});
		}
	}

	getRandomPlaceholder() {
		let array = this.props.selectedOption.form.placeholders;
		let index = Math.floor(Math.random() * array.length);

		return array[index];
	}

	renderButton() {
		if (this.state.checkingOrgMembership) {
			return (
				<Button disabled className="add-btn-primary" type="hollow-primary" submit={true}>
					<Spinner type="primary"/>Add Column
				</Button>
			)
		} else {
			return (
				<Button className="add-btn-primary" type="hollow-primary" submit={true}>
					Add Column
				</Button>
			)
		}
	}

	renderBody() {
		let columnsLimitError, isInvalid = '';

		if (this.props.columns.length >= 20) {
			isInvalid = 'is-invalid';
			columnsLimitError = 'Sorry, but you can\'t have more than 20 columns.';
		}

		return (
			<FormField label={`Type a ${this.props.selectedOption.form.label}`} htmlFor="input-repo" className={isInvalid}>
				<input pattern={this.props.selectedOption.form.pattern} className="FormInput" ref="payload" type="text" placeholder={this.getRandomPlaceholder()} name="input-repo" autoFocus required />
				<FormNote className="form-validation">{columnsLimitError}</FormNote>
			</FormField>
		);
	}

	render() {
		return (
			<form id="addForm" onSubmit={this.handleSubmit.bind(this)}>
				<ModalHeader>
					<button className="Modal__header__close" onClick={this.props.toggleAddModal} type="button"></button>
					<h4 className="Modal__header__text">
						<Icon name={getIcon(this.props.selectedOption.type)} />
						{this.props.selectedOption.type}
					</h4>
				</ModalHeader>
				<ModalBody>
					{this.renderBody()}
				</ModalBody>
				<ModalFooter className="add-footer">
					{this.renderButton()}
					<Button className="add-btn-secondary" type="link-text" onClick={this.props.toggleAddInitialContent}>
						<Icon name="chevron-left" /> Back
					</Button>
				</ModalFooter>
			</form>
		)
	}
}

export default AddForm;