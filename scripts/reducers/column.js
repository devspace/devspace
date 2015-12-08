'use strict';

import * as types from '../constants/actionTypes';

const initialState = {
    interval: undefined,
    lastModified: undefined,
    error: undefined,
    events: undefined
};

export default function column(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_INTERVAL:
            return Object.assign({}, state, {
                interval: action.interval
            });
        case types.CHANGE_LAST_MODIFIED:
            return Object.assign({}, state, {
                lastModified: action.lastModified
            });
        case types.CHANGE_ERROR:
            return Object.assign({}, state, {
                error: action.error
            });
        case types.CHANGE_EVENTS:
            return Object.assign({}, state, {
                events: action.events
            });
        default:
            return state;
    }
};