'use strict';

import * as types from '../constants/actionTypes';

export function updateLastModified(lastModified) {
    return {
        type: types.CHANGE_LAST_MODIFIED,
        lastModified: lastModified
    }
}

export function changeLastModified(lastModified) {
    return (dispatch, getState) => {
        return dispatch(updateLastModified(lastModified));
    }
}

export function updateInterval(interval) {
    return {
        type: types.CHANGE_LAST_MODIFIED,
        interval: interval
    }
}

export function changeInterval(interval) {
    return (dispatch, getState) => {
        return dispatch(updateInterval(interval));
    }
}

export function updateError(error) {
    return {
        type: types.CHANGE_ERROR,
        error: error
    }
}

export function changeError(error) {
    return (dispatch, getState) => {
        return dispatch(updateError(error));
    }
}

export function updateEvents(events) {
    return {
        type: types.CHANGE_EVENTS,
        events: events
    }
}

export function changeEvents(events) {
    return (dispatch, getState) => {
        return dispatch(updateEvents(events));
    }
}