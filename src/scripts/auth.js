import React from 'react';
import Firebase from 'firebase';

import App from './app';
import Home from './home';

import { Spinner } from 'elemental/lib/Elemental';

const firebase = new Firebase('https://devspace-app.firebaseio.com/v1/users');

class Auth extends React.Component {
	constructor() {
		super();

		this.state = {
			auth: undefined,
			isFirstLogin: undefined
		};
	}

	componentWillMount() {
		firebase.onAuth((authData) => {
			if (authData) {
				this.isFirstLogin(authData);
			} else {
				this.setState({
					auth: null
				});
			}
		});
	}

	isFirstLogin = authData => {
		firebase.once('value', (data) => {
			this.setState({
				auth: authData,
				isFirstLogin: data.hasChild(authData.uid) ? false : true
			}, this.saveUserData(authData));
		});
	}

	saveUserData = authData => {
		let user = authData.github.cachedUserProfile;

		let mixpanelData = {
			'$email': authData.github.email,
			'$name': user.name,
			'Avatar': user.avatar_url,
			'Company': user.company,
			'Followers': user.followers,
			'Following': user.following,
			'GitHub Created': user.created_at,
			'ID': user.id,
			'Location': user.location,
			'Login': user.login,
			'Repos': user.public_repos,
			'Site': user.blog
		};

		if (this.state.isFirstLogin) {
			mixpanelData['$created'] = new Date();
		}

		mixpanel.identify(user.id);
		mixpanel.people.set(mixpanelData);

		firebase.child(authData.uid).update({
			user: user
		});
	}

	publicLogin = () => {
		mixpanel.track('Logged With Public Access');

		firebase.authWithOAuthRedirect('github', (err) => {
			if (err) {
				console.err(err);
				return;
			}
		}, { scope: 'user,public_repo' });
	}

	privateLogin = () => {
		mixpanel.track('Logged With Private Access');

		firebase.authWithOAuthRedirect('github', (err) => {
			if (err) {
				console.err(err);
				return;
			}
		}, {
			scope: 'user,repo'
		});
	}

	logout = () => {
		mixpanel.track('Logged Out');

		this.setState({
			auth: null
		});

		firebase.unauth();
	}

	renderLoading = () => {
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
			return (<App auth={this.state.auth} isFirstLogin={this.state.isFirstLogin} logout={this.logout} />);
		}
		else if (this.state.auth === null) {
			return (<Home publicLogin={this.publicLogin} privateLogin={this.privateLogin}/>);
		}
		else {
			return this.renderLoading();
		}
	}
}

export default Auth;