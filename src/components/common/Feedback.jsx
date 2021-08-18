import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Feedback extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="feedback__container">
                        <svg viewBox="0 0 128 128" width="512" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="64" cy="64" fill="#03A64A" r="56.697"/>
                            <path
                                d="m88.349 41.3-31.238 31.239-17.46-17.461a7.5 7.5 0 0 0 -10.607 10.607l22.764 22.764a7.5 7.5 0 0 0 10.607 0l36.541-36.541a7.5 7.5 0 0 0 -10.607-10.608z"
                                fill="#f5f3f8"/>
                        </svg>
                        <p>L'oiseau a bien été ajouté à votre liste d'oiseaux capturés&nbsp;!</p>
                    </div>
                </div>
                <div className="container__feedback">
                    <Link to={'/home'} className="btn__link__back">
                        <span>
                            Retourner à la page d'accueil
                        </span>
                    </Link>
                    <Link to={'/captures'}
                          className="btn__link__back"><span>Voir toutes mes captures</span></Link>
                </div>
            </div>
        );
    }
}

export default Feedback
