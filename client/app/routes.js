import React from 'react';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import * as Auth from './services/AuthService';

import AppContainer from './containers/AppContainer';
import HomeComponent from './components/HomeComponent';
import LoginContainer from './containers/Login/LoginContainer';
import DashboardContainer from './containers/DashboardContainer';
import RegisterContainer from './containers/Login/RegisterContainer';
import ChangeDetailsContainer from './containers/UserDetails/ChangeDetailsContainer';

const isUserLoggedIn = function (nextState, replace) {
    if (!Auth.isUserLoggedIn()) {
        replace({
            pathname: '/login',
            query: {
                message: 'You have to Login first'
            }
        });
    }
};

const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={AppContainer}>
            <IndexRoute component={HomeComponent}/>
            <Route path='/login' component={LoginContainer}></Route>
            <Route path='/register' component={RegisterContainer}></Route>          
            <Route path='/dashboard' onEnter={isUserLoggedIn} component={DashboardContainer}></Route>          
            <Route path='/change-details' onEnter={isUserLoggedIn} component={ChangeDetailsContainer}></Route>          
        </Route>
    </Router>
);

export default routes;