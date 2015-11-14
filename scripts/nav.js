import React from 'react';

class Nav extends React.Component {
	render() {
		return (
			<nav className="nav">
				<header className="nav-top">
					<ul className="nav-list">
						<li className="nav-item">
							<a className="nav-link nav-selected" href="/" title="Home">
								<span className="nav-icon octicon octicon-home"></span>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#" title="Add column">
								<span className="nav-icon octicon octicon-plus"></span>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#" title="Settings">
								<span className="nav-icon octicon octicon-gear"></span>
							</a>
						</li>
					</ul>
				</header>
				<footer className="nav-footer">
					<ul className="nav-list">
						<li className="nav-item">
							<a className="nav-link" href="#" title="Announcements">
								<span className="nav-icon octicon octicon-megaphone"></span>
							</a>
						</li>
						<li className="nav-item">
							<a href="mailto:support@devspace.io" title="Ask a question">
								<span className="nav-icon octicon octicon-question"></span>
							</a>
						</li>
						<li className="nav-item">
							<a href="https://github.com/devspace/bugs" title="Report a bug">
								<span className="nav-icon octicon octicon-bug"></span>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#" title="Sign Out">
								<span className="nav-icon octicon octicon-sign-out"></span>
							</a>
						</li>
					</ul>
				</footer>
			</nav>
		)
	}
}

export default Nav;