'use strict';

import 'whatwg-fetch';
import React from 'react';

import App from './app';
import Home from '../components/home';

import { Spinner } from 'elemental/lib/Elemental';

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
		mixpanel.track('Logged In');
		this.props.dispatch(actionCreators.login());
	}

	logout() {
		mixpanel.track('Logged Out');
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
		if (this.props.isAuthed) {
			return (<App isFirstLogin={this.props.isFirstLogin} auth={this.props.auth} logout={this.logout.bind(this)} />);
		} else if (!this.props.isAuthed && !this.props.isLoading) {
			return (<Home login={this.login.bind(this)}/>);
		} else {
			return this.renderLoading();
		}
	}
}

function mapStateToProps(state) {
	const { auth, isAuthed, isLoading, isFirstLogin } = state.auth;
	return {
		auth: auth,
		isAuthed: isAuthed,
		isLoading: isLoading,
		isFirstLogin: isFirstLogin
	}
}

export default connect(mapStateToProps)(Auth);