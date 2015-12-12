import React from 'react';

class Update extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	handleUpdateLink(event) {
		mixpanel.track('Clicked Sidebar', {
			title: event.currentTarget.getAttribute('aria-label')
		});

		this.props.logout();

		history.replaceState(null, null, '/');
		window.location.reload(true);
	}

	render() {
		return (
			<div className="update-banner">
				<strong><span className="octicon octicon-megaphone"></span></strong>
				A new version is available for you. <strong><a onClick={this.handleUpdateLink.bind(this)}>Update now</a></strong>.
			</div>
		)
	}
}

export default Update;