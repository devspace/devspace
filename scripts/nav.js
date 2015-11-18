import React from 'react';
import reactMixin from 'react-mixin';
import { Link, History } from 'react-router';

import Add from './add';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'elemental/lib/Elemental';

class Nav extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false
		}
	}

	toggleModal(visible) {
		this.setState({
			modalIsOpen: visible
		});
	}

	render() {
		return (
			<div className="nav-container">
				<nav className="nav">
					<header className="nav-top">
						<ul className="nav-list">
							<li className="nav-item">
								<Link to={'app'} className="nav-link" activeClassName="nav-selected" title='Home'>
									<span className="nav-icon octicon octicon-home"></span>
								</Link>
							</li>
							<li className="nav-item">
								<a className="nav-link" onClick={this.toggleModal.bind(this, true)} title="Add column">
									<span className="nav-icon octicon octicon-plus"></span>
								</a>
							</li>
							<li className="nav-item">
								<Link to={'settings'} className="nav-link" title='Settings'>
									<span className="nav-icon octicon octicon-gear"></span>
								</Link>
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
								<Link to={'logout'} className="nav-link" title='Logout'>
									<span className="nav-icon octicon octicon-sign-out"></span>
								</Link>
							</li>
						</ul>
					</footer>
				</nav>
				<Modal isOpen={this.state.modalIsOpen} onCancel={this.toggleModal.bind(this, false)} backdropClosesModal>
					<ModalHeader text="Add column" onClose={this.toggleModal.bind(this, false)} showCloseButton />
					<ModalBody><Add/></ModalBody>
				</Modal>
			</div>
		)
	}
}

reactMixin.onClass(Nav, History);

export default Nav;