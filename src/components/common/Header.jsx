import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <div className="nav__container">
                        <p className="logo">
                            Birdy
                        </p>
                    </div>
                    <h1 className="header_title hidden">Birdy</h1>
                </header>
            </React.Fragment>
        )
    }
}

export default Header;
