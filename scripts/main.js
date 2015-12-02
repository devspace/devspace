import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './store/configureStore';

import Auth from './containers/auth';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <Auth />
    </Provider>),
    document.querySelector('#wrapper')
);