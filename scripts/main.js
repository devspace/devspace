import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'

import App from './app';
import Home from './home';

var routes = (
	<Router>
		<Route path="/" component={Home}/>
		<Route path="/app" component={App}/>
	</Router>
)

ReactDOM.render(routes, document.querySelector('#wrapper'));