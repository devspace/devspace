import React from 'react';

import { Modal, ModalBody, ModalHeader, ModalFooter, FormRow, FormField, Radio, Button } from 'elemental/lib/Elemental';

class Settings extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.settings !== this.props.settings ||
			nextProps.isSettingsModalOpen !== this.props.isSettingsModalOpen;
	}

	handleSettingsSubmit(event) {
		event.preventDefault();
		this.props.toggleSettingsModal();
	}

	handleThemesRadio(event) {
		this.props.setSettings({
			theme: event.target.id,
			columnSize: this.props.settings.columnSize,
			fontSize: this.props.settings.fontSize
		});

		mixpanel.track('Changed Theme', {
			title: event.target.id
		});
	}

	handleColumnsRadio(event) {
		this.props.setSettings({
			theme: this.props.settings.theme,
			columnSize: event.target.id,
			fontSize: this.props.settings.fontSize
		});

		mixpanel.track('Changed Column Width', {
			title: event.target.id
		});
	}

	handleFontsRadio(event) {
		this.props.setSettings({
			theme: this.props.settings.theme,
			columnSize: this.props.settings.columnSize,
			fontSize: event.target.id
		});

		mixpanel.track('Changed Font Size', {
			title: event.target.id
		});
	}

	render() {
		return (
   			<Modal isOpen={this.props.isSettingsModalOpen} onCancel={this.props.toggleSettingsModal} backdropClosesModal>
				<form onSubmit={this.handleSettingsSubmit.bind(this)}>
					<ModalHeader>
						<button className="Modal__header__close" onClick={this.props.toggleSettingsModal} type="button"></button>
						<h4 className="Modal__header__text">
							<span className="octicon octicon-gear"></span> Settings
						</h4>
					</ModalHeader>
					<ModalBody>
						<FormRow>
							<FormField width="one-third" label="Themes">
								<Radio id="dark"  name="themes" label="Dark"  onChange={this.handleThemesRadio.bind(this)} defaultChecked={this.props.settings && this.props.settings.theme === 'dark'  ? true : false } />
								<Radio id="light" name="themes" label="Light" onChange={this.handleThemesRadio.bind(this)} defaultChecked={this.props.settings && this.props.settings.theme === 'light' ? true : false } />
							</FormField>
							<FormField width="one-third" label="Columns">
								<Radio id="column-narrow" name="columns" label="Narrow"  onChange={this.handleColumnsRadio.bind(this)} defaultChecked={this.props.settings && this.props.settings.columnSize === 'column-narrow' ? true : false } />
								<Radio id="column-medium" name="columns" label="Regular" onChange={this.handleColumnsRadio.bind(this)} defaultChecked={this.props.settings && this.props.settings.columnSize === 'column-medium' ? true : false } />
								<Radio id="column-wide"   name="columns" label="Wide"    onChange={this.handleColumnsRadio.bind(this)} defaultChecked={this.props.settings && this.props.settings.columnSize === 'column-wide'   ? true : false } />
							</FormField>
							<FormField width="one-third" label="Fonts">
								<Radio id="font-small"  name="fonts" label="Small"  onChange={this.handleFontsRadio.bind(this)} defaultChecked={this.props.settings && this.props.settings.fontSize === 'font-small'  ? true : false } />
								<Radio id="font-medium" name="fonts" label="Medium" onChange={this.handleFontsRadio.bind(this)} defaultChecked={this.props.settings && this.props.settings.fontSize === 'font-medium' ? true : false } />
								<Radio id="font-large"  name="fonts" label="Large"  onChange={this.handleFontsRadio.bind(this)} defaultChecked={this.props.settings && this.props.settings.fontSize === 'font-large'  ? true : false } />
							</FormField>
						</FormRow>
					</ModalBody>
					<ModalFooter>
						<Button type="hollow-primary" submit={true}>
							Done
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		)
	}
}

export default Settings;