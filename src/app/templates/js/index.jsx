import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter, reduxReactRouter } from 'redux-router';

import createHistory from 'history/lib/createBrowserHistory';

/** Redux utils and middlewares. Check out {@link http://rackt.org/redux/docs/advanced/Middleware.html Middleware} */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './utils/createLogger';

/** Main application reducer. Check out {@link http://rackt.org/redux/docs/basics/Reducers.html Reducers} */
import reducer, { INITIAL_STATE } from './reducer';

/** onTouchTap workaround. See {@link https://github.com/zilverline/react-tap-event-plugin} */
import injectTapEventPlugin from 'react-tap-event-plugin';
import Perf from 'react-addons-perf';

import routes from './app-routes.jsx';

import DevTools from './components/DevTools.jsx';


/** Helpers for performance profiling */
window.React = React;
window.Perf = Perf;

injectTapEventPlugin();


/** Creating store factory with middlewares */
const storeFactoryWithMiddlewares = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    reduxReactRouter({
        routes,
        createHistory,
        routerStateSelector: state => state.get('router').toJS()
    }),
    DevTools.instrument()
)(createStore);

/** Instantiating store with all applied middlewares */
const store = storeFactoryWithMiddlewares(reducer, INITIAL_STATE);

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
            <ReduxRouter routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById("app")
);