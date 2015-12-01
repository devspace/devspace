'use strict';

import * as types from '../constants/actionTypes';

const initialState = {
    auth: null,
    isFirstLogin: true
};

export default function(state = initialState, action) {
    switch ( action.type ) {
        case types.LOGIN:
            return {
                auth: action.auth,
                isFirstLogin: false
            };
        case types.LOGOUT:
            return {
                auth: action.auth,
                isFirstLogin: true
            };
        default:
            return state
    }
};