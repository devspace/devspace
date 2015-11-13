import React from 'react';

class Home extends React.Component {
	render() {
		return (
			<div id="container">
				<div id="particles"></div>
				<img src="./images/icon.png" height="256" width="256" alt="Logo" />
				<h1>DevSpace</h1>
				<h2>The best way to stay in touch with what's happening now on GitHub</h2>
				<a className="btn" href="app.html">
					<span className="octicon octicon-mark-github"></span> Login with GitHub
				</a>
			</div>
		)
	}
}

export default Home;