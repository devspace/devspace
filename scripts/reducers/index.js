'use strict';

import React from 'react';
import { combineReducers } from 'redux';

import add from './add';
import auth from './auth';
import column from './column';

const combinedReducers = combineReducers({
    add, auth, column
});

export default combinedReducers;