import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';

import App from './app';
import Home from './home';

import { Spinner } from 'elemental/lib/Elemental';

const firebase = new Firebase('https://devspace-io.firebaseIO.com/');

class Auth extends React.Component {
	constructor() {
		super();

		this.state = {
			isAuthenticated: undefined
		};
	}

	componentWillMount() {
  		firebase.onAuth((authData) => {
  			if (authData) {
  				this.setState({ isAuthenticated: true });
			} else {
				this.setState({ isAuthenticated: false });
			}
		});
	}

	login() {
		firebase.authWithOAuthRedirect('github', (err, authData) => {
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
			isAuthenticated: false
		});

		firebase.unauth();
	}

	render() {
		if (this.state.isAuthenticated === true) {
			return (<App logout={this.logout.bind(this)} />);
		}
		else if (this.state.isAuthenticated === false) {
			return (<Home login={this.login.bind(this)}/>);
		}
		else {
			return(
				<div className="auth">
  					<Spinner size="lg" type="primary" />
				</div>
			);
		}
	}
}

export default Auth;