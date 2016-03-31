import React from 'react';

class Home extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<div className="home">
				<main className="home-container">
					<img className="home-logo" src="https://devspace.io/images/logo.png" height="148" width="148" alt="DevSpace Logo" />
					<h1 className="home-title">DevSpace</h1>
					<h2 className="home-subtitle">Stay up to date with what's happening now on GitHub</h2>
					<div className="home-btn-container">
						<p className="home-subbtn">Login with GitHub</p>
						<button className="home-btn" onClick={this.props.publicLogin}>
							<span className="octicon octicon-globe"></span> Public Access
						</button>
						<span className="home-btn-divider">or</span>
						<button className="home-btn" onClick={this.props.privateLogin}>
							<span className="octicon octicon-lock"></span> Private Access
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
