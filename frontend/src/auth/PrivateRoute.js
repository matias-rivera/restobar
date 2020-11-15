import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom';
import { isAuthenticated } from './index';

//private route, only show for authenticated users
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => isAuthenticated() ?
    (
        <Component {...props}/>
    ) : (
        <Redirect to={{
            pathname: "/login", 
            state: {from: props.location}
        }} />
    )

    } />
);

export default PrivateRoute;