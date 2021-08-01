import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import Home from './Home'
import PrivateRoute from "../utils/PrivateRoute";
import UserList from './users/UsersList'
import User from './users/User'
import BirdList from './encyclopedia/BirdList'
import BirdDescription from './encyclopedia/BirdDescription'
import CaptureList from './captures/CaptureList'
import Capture from './captures/Capture'
import CaptureEdit from './captures/EditCapture'
import NewCapture from './captures/NewCapture'



export class Content extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/register" component={Register}/>
                <PrivateRoute path="/home" component={Home}/>
                <PrivateRoute path='/users/:id' component={User}/>
                <PrivateRoute path="/users" component={UserList}/>

                <PrivateRoute path='/captures/:id' component={Capture}/>
                <PrivateRoute path='/edit/:id' component={CaptureEdit}/>
                <PrivateRoute path="/captures" component={CaptureList}/>
                <PrivateRoute path="/new" component={NewCapture}/>

                <PrivateRoute path='/encyclopedia/:id' component={BirdDescription}/>
                <PrivateRoute path="/encyclopedia" component={BirdList}/>
                <Route path='*' exact={true} component={Home} />
            </Switch>
        )
    }
}
