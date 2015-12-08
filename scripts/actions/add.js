'use strict';

import * as types from '../constants/actionTypes';

export function setChangeSelectedOption(selectedOption) {
    return {
        type: types.CHANGE_SELECTED_OPTION,
        selectedOption: selectedOption
    }
}

export function changeSelectedOption(selectedOption) {
    return (dispatch, getState) => {
        return dispatch(setChangeSelectedOption(selectedOption));
    }
}