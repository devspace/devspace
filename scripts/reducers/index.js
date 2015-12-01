'use strict';

import React from 'react';
import { combineReducers } from 'redux';

import * as reducers from './auth';

const combinedReducers = combineReducers(reducers);

export default combinedReducers;