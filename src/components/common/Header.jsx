import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <div className="nav__container">
                        <h1 aria-level="1" className="header_title logo">Birdy</h1>
                    </div>
                </header>
            </React.Fragment>
        )
    }
}

export default Header;
