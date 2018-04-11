import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';

import App from './components/App';
import Home from './components/Home';
import Stop from './components/Stop';
import PageNotFound from './components/PageNotFound';

import store, { history } from './store';

const router = (
	<Provider store={store}>
		<Router history={history} render={applyRouterMiddleware( useScroll() )}>
			<Route path={smartguide.guide_path} component={App}>
				<IndexRoute component={Home} />
				<Route path={`${smartguide.guide_path}stop/:stopNumber`} component={Stop}></Route>
				<Route path="*" component={PageNotFound}></Route>
			</Route>
		</Router>
	</Provider>
);

render( router, document.getElementById( 'main' ) );
