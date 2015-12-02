'use strict';

import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const configureStore = function(initialState) {
    const store = createStoreWithMiddleware(reducers, initialState);
    return store;
};