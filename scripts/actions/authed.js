'use strict';

import Firebase from 'firebase';
import * as types from '../constants/actionTypes';

const firebase = new Firebase('https://devspace-app.firebaseio.com/users');

export function setLogin(auth, isFirstLogin) {
    return {
        type: types.LOGIN,
        auth: auth,
        isFirstLogin: isFirstLogin
    }
}

export function setLogout() {
    return {
        type: types.LOGOUT,
        auth: null,
        isFirstLogin: true
    }
}

export function logout() {
    return (dispatch, getState) => {
        firebase.unauth();
        return dispatch(setLogout());
    }
}

export function login() {
    return (dispatch, state) => {
        firebase.authWithOAuthRedirect('github', (err) => {
            if (err) {
                throw err;
            }
        }, {
            scope: 'notifications'
        });
    }
}

export function initAuth() {
    return (dispatch, state) => {
        firebase.onAuth((authData) => {
            let isFirstLogin;
            let auth;

            if (authData) {
                firebase.once('value', function(data) {
                    isFirstLogin = (data.hasChild(authData.uid)) ? false : true;

                    firebase.child(authData.uid).update({
                        user: authData.github
                    }, function(error) {
                        auth = (error) ? null : authData;
                    });

                    dispatch(setLogin(authData, isFirstLogin))
                });
            } else {
                dispatch(setLogout())
            }
        });
    }
}