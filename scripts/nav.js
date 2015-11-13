import React from 'react';
import ReactDOM from 'react-dom';

class Nav extends React.Component {
	render() {
		return (
			<div className="nav">
				<ul>
					<li><a className="nav-selected" href="/" title="Home"><span className="octicon octicon-home"></span></a></li>
					<li><a href="#" title="Add column"><span className="octicon octicon-plus"></span></a></li>
					<li><a href="#" title="Settings"><span className="octicon octicon-gear"></span></a></li>
				</ul>
				<div className="footer">
					<ul>
						<li><a href="#" title="Announcements"><span className="octicon octicon-megaphone"></span></a></li>
						<li><a href="mailto:support@devspace.io" title="Ask a question"><span className="octicon octicon-question"></span></a></li>
						<li><a href="https://github.com/devspace/bugs" title="Report a bug"><span className="octicon octicon-bug"></span></a></li>
						<li><a href="#" title="Sign Out"><span className="octicon octicon-sign-out"></span></a></li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Nav;