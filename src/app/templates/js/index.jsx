import { fromJS } from 'immutable';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Router, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'redux-simple-router'

/** Redux utils and middlewares. Check out {@link http://rackt.org/redux/docs/advanced/Middleware.html Middleware} */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './utils/createLogger';
import fetchMiddleware from './middlewares/fetchMiddleware';

/** Main application reducer. Check out {@link http://rackt.org/redux/docs/basics/Reducers.html Reducers} */
import reducer from './reducer';
import INITIAL_STATE from '../../config/state.json';

/** onTouchTap workaround. See {@link https://github.com/zilverline/react-tap-event-plugin} */
import injectTapEventPlugin from 'react-tap-event-plugin';
import Perf from 'react-addons-perf';

import routes from './app-routes.jsx';

import DevTools from './components/DevTools.jsx';


/** Helpers for performance profiling */
window.React = React;
window.Perf = Perf;

injectTapEventPlugin();

const reduxRouterMiddleware = syncHistory(browserHistory)

/** Creating store factory with middlewares */
const storeFactoryWithMiddlewares = compose(
    applyMiddleware(thunkMiddleware, fetchMiddleware, reduxRouterMiddleware, loggerMiddleware),
    DevTools.instrument()
)(createStore);

/** Instantiating store with all applied middlewares */
const store = storeFactoryWithMiddlewares(reducer, fromJS(INITIAL_STATE));

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store, state => state.get('routing').toJS())

/**
 * Rendering our root React component to html element
 *
 * Provider wrapper component provides store context property passing down through children components if needed
 * Router wrapper component provides handling React components change (page transitions) on browser history changes
 * Router component requires list of app routes built with Route component. See {@link AppRoutes}.
 */
render(
    <Provider store={store}>
        <div className="app__container">
            <Router history={browserHistory}>
                {routes}
            </Router>
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById("app")
);