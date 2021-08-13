import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Home from './Home.jsx';
import PrivateRoute from "../utils/PrivateRoute.jsx";
import UserList from './users/UsersList.jsx';
import User from './users/User.jsx';
import BirdList from './encyclopedia/BirdList.jsx';
import BirdDescription from './encyclopedia/BirdDescription.jsx';
import CaptureList from './captures/CaptureList.jsx';
import {AuthProvider} from '../context/Auth.jsx';
import NewCapture from './captures/NewCapture';
import Capture from './captures/Capture';
import CaptureEdit from './captures/EditCapture'
import SitesList from './sites/SitesList'
import NewSite from './sites/NewSite'

export class Content extends React.Component {
    render() {
        return (
            <AuthProvider>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <PrivateRoute path="/home" component={Home}/>
                    <PrivateRoute path='/users/:id' component={User}/>
                    <PrivateRoute path="/users" component={UserList}/>
                    <PrivateRoute path='/sites/new' component={NewSite}/>
                    <PrivateRoute path='/sites' component={SitesList}/>
                    <PrivateRoute path='/captures/:id' component={Capture}/>
                    <PrivateRoute path='/edit/:id' component={CaptureEdit}/>
                    <PrivateRoute path="/captures" component={CaptureList}/>
                    <PrivateRoute path="/capture/new" component={NewCapture}/>
                    <PrivateRoute path='/encyclopedia/:id' component={BirdDescription}/>
                    <PrivateRoute path="/encyclopedia" component={BirdList}/>
                    <Route path='*' exact={true} component={Home}/>
                </Switch>
            </AuthProvider>
        )
    }
}
