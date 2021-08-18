import React, {Component} from 'react';
import Header from './components/common/Header.jsx'
import {Content} from "./components/Content.jsx";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <main className="main">
                    <Content/>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
