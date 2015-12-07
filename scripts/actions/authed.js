'use strict';

import Firebase from 'firebase';
import * as types from '../constants/actionTypes';

const firebase = new Firebase('https://devspace-app.firebaseio.com/users');

export function setLogin(authData, isFirstLogin) {
    return {
        type: types.LOGIN,
        auth: authData,
        isFirstLogin: isFirstLogin
    }
}

export function setLogout() {
    return {
        type: types.LOGOUT
    }
}

export function setLoading(isLoading) {
    return {
        type: types.LOADING,
        isLoading: isLoading
    }
}

export function logout() {
    return (dispatch, getState) => {
        firebase.unauth();
        return dispatch(setLogout());
    }
}

export function authLoading(isLoading) {
    return (dispatch, getState) => {
        return dispatch(setLoading(isLoading));
    }
}

export function login() {
    return (dispatch, state) => {
        dispatch(authLoading(true));

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

                    let user = authData.github.cachedUserProfile;

                    mixpanel.identify(user.id);
                    mixpanel.people.set({
                        'Avatar': user.avatar_url,
                        'Company': user.company,
                        'Followers': user.followers,
                        'Following': user.following,
                        'Location': user.location,
                        'Login': user.login,
                        'Site': user.blog,
                        'Repos': user.public_repos,
                        'GitHub Created': user.created_at,
                        '$email': user.email,
                        '$name': user.name
                    });

                    dispatch(setLogin(authData, isFirstLogin));
                });
            } else {
                dispatch(setLogout())
            }
        });
    }
}