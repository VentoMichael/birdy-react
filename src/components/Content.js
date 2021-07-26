import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import Home from './Home'
import PrivateRoute from "../utils/PrivateRoute";
import UserList from './users/UsersList'


export class Content extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/register" component={Register}/>
                <PrivateRoute path="/home" component={Home}/>
                <PrivateRoute path="/users" component={UserList}/>
                <Route path='*' exact={true} component={Home} />
            </Switch>
        )
    }
}
