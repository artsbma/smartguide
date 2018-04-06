import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';
import ReactGA from 'react-ga';

import App from './components/App';
import Home from './components/Home';
import Stop from './components/Stop';
import PageNotFound from './components/PageNotFound';

import store, { history } from './store';

ReactGA.initialize( 'UA-4443164-8', { debug: false } );

function logPageView() {
	ReactGA.set( { page: window.location.pathname } );
	ReactGA.pageview( window.location.pathname );
}

const router = (
	<Provider store={store}>
		<Router history={history} render={applyRouterMiddleware( useScroll() )} onUpdate={logPageView}>
			<Route path={smartguide.guide_path} component={App}>
				<IndexRoute component={Home} />
				<Route path={`${smartguide.guide_path}stop/:stopNumber`} component={Stop}></Route>
				<Route path="*" component={PageNotFound}></Route>
			</Route>
		</Router>
	</Provider>
);

render( router, document.getElementById( 'main' ) );
