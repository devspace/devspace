'use strict';

import * as types from '../constants/actionTypes';

const initialState = {
    auth: null,
    isAuthed: false,
    isFirstLogin: true,
    isLoading: true
};

export default function(state = initialState, action) {
    switch ( action.type ) {
        case types.LOGIN:
            return Object.assign({}, state, {
                auth: action.auth,
                isAuthed: true,
                isLoading: false,
                isFirstLogin: action.isFirstLogin
            });
        case types.LOGOUT:
            return Object.assign({}, initialState, {
                isLoading: false
            });
        case types.LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });
        default:
            return state
    }
};