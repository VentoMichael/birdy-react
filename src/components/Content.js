import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home'

export class Content extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/home" component={Home}/>
            </Switch>
        )
    }
}
