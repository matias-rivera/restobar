import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom';
import { isAuthenticated } from './index';

//private route, only show for admin users
const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => isAuthenticated() && isAuthenticated().isAdmin === true ?
    (
        <Component {...props}/>
    ) : (
        <Redirect to={{
            pathname: "/not-authorized", 
            state: {from: props.location}
        }} />
    )

    } />
);

export default AdminRoute;