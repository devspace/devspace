import React from 'react';

import { ModalBody, ModalFooter, ModalHeader, FormField, FormInput, FormIconField, Button, Spinner } from 'elemental/lib/Elemental';

import { getIcon } from '../data/column';

class AddForm extends React.Component {
	constructor() {
		super();

		this.state = {
			checkingOrgMembership: false
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.checkingOrgMembership !== this.state.checkingOrgMembership;
	}

	checkOrgMembership(type, payload, github) {
		return new Promise(function(resolve, reject) {
			if (type !== 'Organization') {
				resolve(type);
			} else {
				this.setState({ checkingOrgMembership: true });

				fetch(`https://api.github.com/orgs/${payload}/members/${github.username}`, {
					headers: {
						'User-Agent': 'DevSpace',
						'Authorization': 'token ' + github.accessToken
					}
				})
				.then((response) => {
					this.setState({ checkingOrgMembership: false });

					if (response.status === 204 || response.status === 302) {
						resolve('Organization (Private)');
					} else {
						resolve('Organization');
					}
				})
				.then(() => {
					resolve('Organization');
				});
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.checkOrgMembership(this.props.selectedOption.type, this.refs.payload.value, this.props.github)
			.then((type) => {
				this.props.addColumn({
					type: type,
					payload: this.refs.payload.value
				});

				this.props.toggleAddModal();
			});
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

	render() {
		return (
			<form id="addForm" onSubmit={this.handleSubmit.bind(this)}>
				<ModalHeader>
					<button className="Modal__header__close" onClick={this.props.toggleAddModal} type="button"></button>
					<h4 className="Modal__header__text">
						<span className={"octicon octicon-" + getIcon(this.props.selectedOption.type)}></span>
						{this.props.selectedOption.type}
					</h4>
				</ModalHeader>
				<ModalBody>
					<FormField label={`Type a ${this.props.selectedOption.form.label}`} htmlFor="input-repo">
						<input pattern={this.props.selectedOption.form.pattern} className="FormInput" ref="payload" type="text" placeholder={this.getRandomPlaceholder()} name="input-repo" autoFocus required />
					</FormField>
				</ModalBody>
				<ModalFooter className="add-footer">
					{this.renderButton()}
					<Button className="add-btn-secondary" type="link-text" onClick={this.props.toggleAddInitialContent}>
						<span className="octicon octicon-chevron-left"></span>Back
					</Button>
				</ModalFooter>
			</form>
		)
	}
}

export default AddForm;