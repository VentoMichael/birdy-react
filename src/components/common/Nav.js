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
                        <svg className="logo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             viewBox="0 0 168.5 209">
                            <g transform="translate(0.000000,626.000000) scale(0.100000,-0.100000)">
                                <path fill="#2946A6" d="M206,6253c-1-12-5-23-11-25c-15-5-30-131-30-258l-1-115l-21,25c-12,14-41,67-65,118c-24,50-48,92-53,92
		c-17,0-25-96-25-290c1-185,2-199,28-275c65-192,175-310,388-413c70-33,97-51,94-61c-10-25-33-202-50-366c-23-233-14-211-98-225
		c-131-22-177-51-177-111c0-28,9-49,39-87c55-69,87-92,131-92c57,0,97,55,124,171c8,34,19,65,23,69s41,15,82,25
		c153,36,291,107,395,205c112,105,180,234,246,467c77,269,117,361,187,429c68,66,95,75,194,64c103-12,99-12,99,0c0,5-28,26-63,46
		c-49,28-69,47-91,86c-46,82-140,174-214,210c-58,29-77,33-143,33c-67-1-85-5-145-35c-66-34-170-125-225-197l-24-33l-117,49
		c-143,59-211,99-279,165c-66,65-112,136-150,233c-16,43-34,87-39,98C207,6274,206,6274,206,6253z M367,5864c80-75,152-115,333-189
		c200-81,250-110,336-195c58-58,85-93,114-154c37-78,37-79,25-135c-38-172-135-394-200-456l-26-25l-13,67c-27,150-102,249-314,416
		c-166,131-241,211-294,313c-64,124-84,206-90,374l-5,145l35-50C287,5947,332,5897,367,5864z M1307,5884c42-22,124-99,159-151
		c16-23,29-44,29-46s-27-21-59-41c-93-57-155-140-208-276c-10-25-10-24-33,20c-54,108-154,206-268,264c-61,31-61,32,15,112
		c99,105,183,147,276,139C1250,5902,1290,5893,1307,5884z M141,5770c26-27,39-55,54-115c46-184,151-335,336-482c46-36,82-68,80-70
		c-5-5-187,82-260,125c-185,108-286,303-286,548v87l22-29C99,5818,123,5789,141,5770z M662,4993c135-75,213-187,213-303
		c0-44-4-52-33-74c-49-37-172-92-258-114c-41-11-75-19-77-17c-5,4,37,355,53,447c8,46,15,86,15,91C575,5037,597,5030,662,4993z
		 M418,4368c-10-57-37-120-55-132c-14-8-23-5-48,19c-47,45-75,94-62,107c12,12,109,36,149,37C422,4400,424,4396,418,4368z"/>
                            </g>
                        </svg>
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
