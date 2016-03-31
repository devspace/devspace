import React from 'react';

class Nav extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	trackLink(event) {
		mixpanel.track('Clicked Sidebar', {
			title: event.currentTarget.getAttribute('aria-label')
		});
	}

	handleAddLink(event) {
		this.trackLink(event);
		this.props.toggleAddModal();
	}

	handleSettingsLink(event) {
		this.trackLink(event);
		this.props.toggleSettingsModal();
	}

	handleLogoutLink(event) {
		this.trackLink(event);
		this.props.logout();
	}

	render() {
		return (
			<div className="nav-container">
				<nav className="nav">
					<header className="nav-top">
						<ul className="nav-list">
							<li className="nav-item">
								<a className="nav-link tooltipped tooltipped-e" onClick={this.handleAddLink.bind(this)} aria-label="Add column">
									<span className="nav-icon octicon octicon-plus"></span>
								</a>
							</li>
						</ul>
					</header>
					<footer className="nav-footer">
						<ul className="nav-list">
							<li className="nav-item">
								<a className="nav-link tooltipped tooltipped-e" onClick={this.trackLink.bind(this)} href="https://github.com/devspace/devspace/issues/new" target="_blank" aria-label="Report a bug">
									<span className="nav-icon octicon octicon-bug"></span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link tooltipped tooltipped-e" onClick={this.handleSettingsLink.bind(this)} aria-label="Settings">
									<span className="nav-icon octicon octicon-gear"></span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link tooltipped tooltipped-e" onClick={this.handleLogoutLink.bind(this)} aria-label="Logout">
									<span className="nav-icon octicon octicon-sign-out"></span>
								</a>
							</li>
						</ul>
					</footer>
				</nav>
			</div>
		)
	}
}

export default Nav;