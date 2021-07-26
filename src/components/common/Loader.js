import React, {Component} from 'react';

class Loader extends Component{
    render() {
        return (
            <div className="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}

export default Loader
