import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import createBrowserHistory from 'history/lib/createBrowserHistory';

/** Redux utils and middlewares. Check out {@link http://rackt.org/redux/docs/advanced/Middleware.html Middleware} */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './utils/createLogger';

/** Main application reducer. Check out {@link http://rackt.org/redux/docs/basics/Reducers.html Reducers} */
import reducer from './reducer';

/** onTouchTap workaround. See {@link https://github.com/zilverline/react-tap-event-plugin} */
import injectTapEventPlugin from 'react-tap-event-plugin';
import Perf from 'react-addons-perf';

import AppRoutes from './app-routes.jsx';

/** Helpers for performance profiling */
window.React = React;
window.Perf = Perf;

injectTapEventPlugin();


/** Creating store factory with middlewares */
const storeFactoryWithMiddlewares = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);

/** Instantiating store with all applied middlewares */
const store = storeFactoryWithMiddlewares(reducer);

/**
 * Rendering our root React component to html element
 *
 * Provider wrapper component provides store context property passing down through children components if needed
 * Router wrapper component provides handling React components change (page transitions) on browser history changes
 * Router component requires list of app routes built with Route component. See {@link AppRoutes}.
 */
render(
    <Provider store={store}>
        <Router history={createBrowserHistory()} onUpdate={() => window.scrollTo(0, 0)}>
            {AppRoutes}
        </Router>
    </Provider>,
    document.getElementById("app")
);