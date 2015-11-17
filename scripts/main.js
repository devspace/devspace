import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './app';
import Home from './home';
import NotFound from './notFound';

var routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={Home}/>
		<Route path="/app" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
)

ReactDOM.render(routes, document.querySelector('#wrapper'));