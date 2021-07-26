import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";


class Nav extends Component {
    render () {
        if (this.props.location.pathname === '/') {
            return (
                <React.Fragment>
                    <div>
                        <Link to='/register' className="login__link">S'inscrire</Link>
                    </div>
                </React.Fragment>
            )
        }
        if (this.props.location.pathname === '/register') {
            return (
                <React.Fragment>
                    <div>
                        <Link to='/'>Se connecter</Link>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="nav__container">
                        <div className="nav">
                            <Link to='/home' exact={true} className="nav__link">
                                <p>Home</p>
                            </Link>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
};

export default withRouter(Nav);
