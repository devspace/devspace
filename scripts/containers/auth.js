import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';


import App from './../app';
import Home from './../components/home';

import { Spinner } from 'elemental/lib/Elemental';

const firebase = new Firebase('https://devspace-app.firebaseio.com/users');

import { connect } from 'react-redux';
import * as actionCreators from '../actions/authed';

class Auth extends React.Component {
	constructor(props) {
		super(props);
		const { dispatch } = this.props;
	}

	componentDidMount() {
		this.props.dispatch(actionCreators.initAuth())
	}

	login() {
		ga('send', 'event', 'Internal Links', 'Click', 'Login');

		this.props.dispatch(actionCreators.login());
	}

	logout() {
		ga('send', 'event', 'Internal Links', 'Click', 'Logout');
		this.props.dispatch(actionCreators.logout());
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
		if ( this.props.isAuthed ) {
			return (<App isFirstLogin={this.props.isFirstLogin} auth={this.props.auth} logout={this.logout.bind(this)} />);
		} else if ( !this.props.isAuthed  && !this.props.isLoading ) {
			return (<Home login={this.login.bind(this)}/>);
		} else {
			return this.renderLoading();
		}
	}
}

function mapStateToProps(state) {
	const { auth, isAuthed, isLoading, isFirstLogin } = state.default;
	return {
		auth: auth,
		isAuthed: isAuthed,
		isLoading: isLoading,
		isFirstLogin: isFirstLogin
	}
}

export default connect(mapStateToProps)(Auth);