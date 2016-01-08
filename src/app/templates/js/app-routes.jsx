import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';

/** Here we define app container component for handling routes */
import Container from './app-container.jsx';

/** Here we define all our app page components */
import Main from './components/pages/Main.jsx';
import Home from './components/pages/Home.jsx';
import Dash from './components/pages/Dash.jsx';

const AppRoutes = (
    <Route path="/" component={Container}>
        <Route path="home" component={Home}/>
        <Route path="dash" component={Dash}/>

        <IndexRoute component={Main}/>
    </Route>
);

export default AppRoutes;