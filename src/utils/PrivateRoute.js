import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const TOKEN_KEY = 'connected';
const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return false;
    }

    return true;
}
const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/register" />
        )} />

    );
};

export default PrivateRoute;