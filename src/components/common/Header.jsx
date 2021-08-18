import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";


class Header extends Component {
    render() {
        if (this.props.location.pathname === '/' || this.props.location.pathname === '/register') {
            return (
                <React.Fragment>
                    <header className="header nav__container">
                        <Link to='/'>
                            <p className="logo">
                                Birdy
                            </p>
                        </Link>
                    </header>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <header className="header nav__container">
                        <Link to='/home'>
                            <p className="logo">
                                Birdy
                            </p>
                        </Link>
                        <input className="menu-btn" type="checkbox" id="menu-btn"/>
                        <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                        <ul className="menu nav">
                            <li>
                                <Link to='/home' className="nav__link">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/users' className="nav__link">
                                    Utilisateurs
                                </Link>
                            </li>
                            <li>
                                <Link to='/encyclopedia' className="nav__link">
                                    Encyclopédie
                                </Link>
                            </li>
                            <li>
                                <Link to='/captures' className="nav__link">
                                    Mes captures
                                </Link>
                            </li>
                            <li>
                                <Link to='/sites' className="nav__link">
                                    Sites de capture
                                </Link>
                            </li>
                        </ul>
                    </header>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(Header);
