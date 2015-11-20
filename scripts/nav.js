import React from 'react';
import ReactDOM from 'react-dom';

import Home from './home';

class Nav extends React.Component {
	render() {
		return (
			<div className="nav-container">
				<nav className="nav">
					<header className="nav-top">
						<ul className="nav-list">
							<li className="nav-item">
								<a className="nav-link" onClick={this.props.toggleAddModal} title="Add column">
									<span className="nav-icon octicon octicon-plus"></span>
								</a>
							</li>
						</ul>
					</header>
					<footer className="nav-footer">
						<ul className="nav-list">
							<li className="nav-item">
								<a className="nav-link" href="https://github.com/devspace/devspace/releases" target="_blank" title="Releases">
									<span className="nav-icon octicon octicon-megaphone"></span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="https://github.com/devspace/devspace/issues/new" target="_blank" title="Report a bug">
									<span className="nav-icon octicon octicon-bug"></span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" onClick={this.props.logout} title="Logout">
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