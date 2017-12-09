import React from 'react';

import { Spinner } from 'elemental/lib/Elemental';

import Icon from './icon';

class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			clickedPublicLoginBtn: false,
			clickedPrivateLoginBtn: false
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.clickedPublicLoginBtn !== this.state.clickedPublicLoginBtn ||
			nextState.clickedPrivateLoginBtn !== this.state.clickedPrivateLoginBtn;
	}

	onClickPublicLogin() {
		this.setState({ clickedPublicLoginBtn: true });
		this.props.publicLogin();
	}

	onClickPrivateLogin() {
		this.setState({ clickedPrivateLoginBtn: true });
		this.props.privateLogin();
	}

	render() {
		var publicLoginIcon = <Icon name="globe" />;
		var privateLoginIcon = <Icon name="lock" />;

		if (this.state.clickedPublicLoginBtn) {
			publicLoginIcon = <Spinner type="primary" />;
		}

		if (this.state.clickedPrivateLoginBtn) {
			privateLoginIcon = <Spinner type="primary" />;
		}

		return (
			<div className="home">
				<main className="home-container">
					<img className="home-logo" src="/images/app/logo.png" srcSet="/images/app/logo@2x.png 2x" alt="DevSpace Logo" width="148" height="148" />
					<h1 className="home-title">DevSpace</h1>
					<h2 className="home-subtitle">Stay up to date with what is happening now on GitHub</h2>
					<div className="home-btn-container">
						<p className="home-subbtn">Login with GitHub</p>
						<button className="home-btn" onClick={this.onClickPublicLogin.bind(this)}>
							<span>{publicLoginIcon}</span>
							<span>Public Access</span>
						</button>
						<span className="home-btn-divider">or</span>
						<button className="home-btn" onClick={this.onClickPrivateLogin.bind(this)}>
							<span>{privateLoginIcon}</span>
							<span>Private Access</span>
						</button>
						<p className="home-subbtn">Why all these permissions?</p>
						<p className="home-subbtn">
							<a target="_blank" href="https://github.com/dear-github/dear-github/issues/113">Read our Open Letter to GitHub</a>
						</p>
					</div>
				</main>
				<footer className="home-footer">
					<div className="home-footer-container">
						<p className="home-footer-copyright">© 2016 <a target="_blank" href="http://www.liferay.com">Liferay, Inc</a></p>
						<ul className="home-footer-nav">
							<li><a target="_blank" href="https://blog.devspace.io">Blog</a></li>
							<li><a target="_blank" href="https://github.com/devspace/devspace/releases">Changelog</a></li>
							<li><a target="_blank" href="https://devspace.io/privacy">Privacy</a></li>
							<li><a target="_blank" href="mailto:hi@devspace.io">Email</a></li>
							<li><a target="_blank" href="http://twitter.com/devspace_">Twitter</a></li>
						</ul>
					</div>
				</footer>
			</div>
		)
	}
}

export default Home;
