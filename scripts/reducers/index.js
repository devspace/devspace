'use strict';

import React from 'react';
import { combineReducers } from 'redux';

import * as authReducers from './auth';
import * as addReducers from './add';

const combinedReducers = combineReducers(authReducers, addReducers);

export default combinedReducers;