'use strict';

import * as types from '../constants/actionTypes';

const initialState = {
    selectedOption: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_SELECTED_OPTION:
            return Object.assign({}, state, {
                selectedOption: action.selectedOption
            });
        default:
            return state;
    }
};