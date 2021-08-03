import React, {Component} from 'react';
import Firebase from 'firebase';
import config from './config/config.jsx';
import Header from './components/common/Header.jsx'
import {Content} from "./components/Content.jsx";
import Nav from "./components/common/Nav.jsx";
import { AuthProvider } from './context/Auth.jsx';

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
