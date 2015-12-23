import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';

import App from './app';
import Home from './home';

import { Spinner } from 'elemental/lib/Elemental';

const firebase = new Firebase('https://devspace-app.firebaseio.com/users');

class Auth extends React.Component {
	constructor() {
		super();

		this.state = {
			auth: undefined,
			isFirstLogin: undefined
		};
	}

	componentWillMount() {
		var self = this;

		firebase.onAuth((authData) => {
			if (authData) {
				firebase.once('value', function(data) {
					if (data.hasChild(authData.uid)) {
						self.setState({
							isFirstLogin: false
						});
					}
					else {
						self.setState({
							isFirstLogin: true
						});
					}

					self.setState({
						auth: authData
					});

					let user = authData.github.cachedUserProfile;

					mixpanel.identify(user.id);
					mixpanel.people.set({
						'Avatar': user.avatar_url,
						'Company': user.company,
						'Followers': user.followers,
						'Following': user.following,
						'GitHub Created': user.created_at,
						'ID': user.id,
						'Location': user.location,
						'Login': user.login,
						'Repos': user.public_repos,
						'Site': user.blog,
						'$email': user.email,
						'$name': user.name
					});
				});
			} else {
				self.setState({
					auth: null
				});
			}
		});
	}

	login() {
		mixpanel.track('Logged In');

		firebase.authWithOAuthRedirect('github', (err) => {
			if (err) {
				console.err(err);
				return;
			}
		}, {
			scope: 'user,repo'
		});
	}

	logout() {
		mixpanel.track('Logged Out');

		this.setState({
			auth: null
		});

		firebase.unauth();
	}

	renderLoading() {
		return (
			<div className="auth">
				<div className="centered">
					<Spinner size="lg" type="primary" />
				</div>
			</div>
		)
	}

	render() {
		if (this.state.auth) {
			return (<App isFirstLogin={this.state.isFirstLogin} auth={this.state.auth} logout={this.logout.bind(this)} />);
		}
		else if (this.state.auth === null) {
			return (<Home login={this.login.bind(this)}/>);
		}
		else {
			return this.renderLoading();
		}
	}
}

export default Auth;