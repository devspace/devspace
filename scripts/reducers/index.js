'use strict';

import React from 'react';
import { combineReducers } from 'redux';

import auth from './auth';
import add from './add';

const combinedReducers = combineReducers({
    auth,
    add
});

export default combinedReducers;