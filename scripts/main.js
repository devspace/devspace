import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import App from './app';
import Add from './add';
import Home from './home';
import NotFound from './notFound';

var routes = (
	<Router history={createHistory()}>
		<Route path="/" component={Home}/>
		<Route path="/app" component={App}/>
		<Route path="/add" component={Add}/>
		<Route path="*" component={NotFound}/>
	</Router>
)

ReactDOM.render(routes, document.querySelector('#wrapper'));