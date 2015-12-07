'use strict';

import React from 'react';

class Home extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<div className="home">
				<main className="home-container">
					<img className="home-logo" src="./images/icon.png" height="256" width="256" alt="DevSpace Logo" />
					<h1 className="home-title">DevSpace</h1>
					<h2 className="home-subtitle">The best way to stay in touch with what's happening now on GitHub</h2>
					<button className="home-btn" onClick={this.props.login}>
						<span className="octicon octicon-mark-github"></span> Login with GitHub
					</button>
				</main>
			</div>
		)
	}
}

export default Home;
