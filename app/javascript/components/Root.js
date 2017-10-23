import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import HomeLayout from './layouts/HomeLayout';
import AppLayout from './layouts/AppLayout';

import RequireAuthentication from './authentication/RequireAuthentication'; // HOC
import Home from './Home'; // Index page
import Signin from './authentication/Signin';
import Signup from './authentication/Signup';
import Signout from './authentication/Signout';
import Dashboard from './Dashboard';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
    return(
        <Route { ...rest }
            render={ props => (
                <Layout>
                    <Component { ...props } />
                </Layout>
            )}
        />
    )
};

const Root = ({ store }) => {
    return(
        <Provider store={ store }>
            <BrowserRouter>
                <div>
                    <Switch>
                        <AppRoute exact path="/" layout={ HomeLayout } component={ Home } />
                        <AppRoute path="/signin" layout={ HomeLayout } component={ Signin } />
                        <AppRoute path="/signup" layout={ HomeLayout } component={ Signup } />
                        <AppRoute path="/signout" layout={ HomeLayout } component={ Signout } />
                        <AppRoute path="/dashboard" layout={ AppLayout } component={ RequireAuthentication(Dashboard) } />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    )
};

Root.PropTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
