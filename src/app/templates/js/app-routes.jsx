import _ from 'lodash';
import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';

/** Here we define app container component for handling routes */
import Container from './app-container.jsx';

/** Here we define all our app page components */
import Index from './components/pages/Index.jsx';

import routes from '../../config/routes.json';


const components = {};

/**
 * @param {String} routeName
 */
function requireComponents(routeName) {
    const route = this[routeName.split('/').pop()];

    const componentName   = routeName.split('/').map(_.camelCase).map(_.capitalize).join('/');
    components[routeName] = require(`./components/pages/${componentName}.jsx`).default;

    if (_.isPlainObject(route.routes)) {
        Object.keys(route.routes).map(subrouteName => `${routeName}/${subrouteName}`).map(requireComponents, route.routes);
    }
};

/**
 * Generate Route components config
 *
 * @param {String} routeName
 *
 * @returns {XML}
 */
function generateRoutes(routeName) {
    const route = this[routeName.split('/').pop()];

    return (
        <Route path={route.path} component={components[routeName]} key={routeName}>
            {_.isPlainObject(route.routes) ?
                Object.keys(route.routes).map(subrouteName => `${routeName}/${subrouteName}`).map(generateRoutes, route.routes)
                : null}
        </Route>
    )
}

/**
 * Require page components
 *
 * Components are resolved as follows (route names are translated to component files on disk):
 *
 * indexRouteName               => pages/IndexRouteName.jsx
 * indexRouteName/subRouteName1 => pages/IndexRouteName/SubRouteName1.jsx
 * indexRouteName/subRouteName2 => pages/IndexRouteName/SubRouteName2.jsx
 */
Object.keys(routes).map(requireComponents, routes);

/**
 * Generate Route components config
 *
 * TODO: change with plain JSX config generation in yo generator - need code transformation
 * @author tony.pizzicato
 * @date 12.01.16
 * @time 13:14
 */
const AppRoutes = (
    <Route path="/" component={Container}>
        {Object.keys(routes).map(generateRoutes, routes)}
        <IndexRoute component={Index}/>
    </Route>
);

export default AppRoutes;