import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class Nav extends Component {
    render () {
        if (this.props.location.pathname === '/') {
            return (
                <React.Fragment>
                    <div>
                        <Link to='/register' className="link__back">Je me crée un compte</Link>
                    </div>
                </React.Fragment>
            )
        }
        if (this.props.location.pathname === '/register') {
            return (
                <React.Fragment>
                    <div>
                        <Link to='/' className="link__back">J'ai déjà un compte</Link>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="nav__container">
                        <Link to='/home'>
                            <p className="logo">
                                Birdy
                            </p>
                        </Link>
                        <div className="nav">
                            <Link to='/home' className="nav__link">
                                <p>Home</p>
                            </Link>
                            <Link to='/users' className="nav__link">
                                <p>Utilisateurs</p>
                            </Link>
                            <Link to='/encyclopedia' className="nav__link">
                                <p>Encyclopédie</p>
                            </Link>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
};

export default withRouter(Nav);
