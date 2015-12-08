'use strict';

import React from 'react';

import { Modal } from 'elemental/lib/Elemental';

import AddForm from '../components/add-form';
import AddOptions from '../components/add-options';

import { connect } from 'react-redux';
import * as actionCreators from '../actions/add';

class Add extends React.Component {
	constructor(props) {
		super(props);
		const { dispatch } = this.props;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.isAddModalOpen !== this.props.isAddModalOpen ||
			nextProps.isAddInitialContent !== this.props.isAddInitialContent;
	}

	changeSelectedOption(option) {
		this.props.dispatch(actionCreators.changeSelectedOption(option));
	}

	renderContent() {
		if (this.props.isAddInitialContent) {
			return <AddOptions changeSelectedOption={this.changeSelectedOption.bind(this)} toggleAddModal={this.props.toggleAddModal} toggleAddInitialContent={this.props.toggleAddInitialContent} />
		} else {
			return <AddForm auth={this.props.auth} addColumn={this.props.addColumn} selectedOption={this.props.selectedOption} toggleAddModal={this.props.toggleAddModal} toggleAddInitialContent={this.props.toggleAddInitialContent} />
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

function mapStateToProps(state) {
	console.log(state);
	const { selectedOption } = state.add;
	return {
		selectedOption: selectedOption
	}
}

export default connect(mapStateToProps)(Add);