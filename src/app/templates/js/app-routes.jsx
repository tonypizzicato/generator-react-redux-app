import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';

/** Here we define app container component for handling routes */
import Container from './app-container.jsx';

/** Here we define all our app page components */
import Application from './components/Application.jsx';

const AppRoutes = (
    <Route path="/" component={Container}>
        <Route path="home" component={Application}/>

        <IndexRoute component={Application}/>
    </Route>
);

export default AppRoutes;