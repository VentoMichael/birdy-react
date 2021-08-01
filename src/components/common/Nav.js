import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class Nav extends Component {
    render() {
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
                        <Link to='/captures' className="nav__link">
                            <p>Mes captures</p>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
;

export default withRouter(Nav);
