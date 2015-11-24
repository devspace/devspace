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

					firebase.child(authData.uid).update({
						user: authData.github
					}, function(error) {
						if (error) {
							self.setState({
								auth: null
							});
						} else {
							self.setState({
								auth: authData
							});
						}
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
		firebase.authWithOAuthRedirect('github', (err) => {
			if (err) {
				console.err(err);
				return;
			}
		}, {
			scope: 'notifications'
		});
	}

	logout() {
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