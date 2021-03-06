import React, {Component} from 'react';
import Firebase from 'firebase';
import config from './config/config';
import Header from './components/common/Header'
import {Content} from "./components/Content";
import Nav from "./components/common/Nav";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <main className="main">
                    <Content/>
                </main>
                <Nav/>
            </React.Fragment>
        );
    }
}

export default App;
