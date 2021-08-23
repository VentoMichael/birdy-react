import React, {useEffect, useRef, useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import firebase from '../config/config.jsx';

const Login = () => {
    const [isLogged, setisLogged] = useState(false);
    const [error, setError] = useState(false);
    const userMail = useRef('');
    const userPassword = useRef('');

    const connectUser = (e) => {
        e.preventDefault();
        const mail = userMail.current.value;
        const password = userPassword.current.value;
        firebase.auth().signInWithEmailAndPassword(mail, password)
            .then(function () {
                setisLogged(true)
            })
            .catch(function () {
                setisLogged(false);
                setError(true);
            });
    };
    useEffect(() => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                setisLogged(true);
            } else {
                setisLogged(false);
            }
        })
    }, []);
    if (isLogged === true) {
        return <Redirect to='/home'/>
    }
    return (
        <React.Fragment>
            <section>
                <div className="form__container">
                    <h2 aria-level="2" className="title__login">Formulaire de connexion</h2>
                    <form action="#" method="POST" className="form form__login" onSubmit={connectUser}>
                        <div className="container__login">
                            <div className="form__control">
                                <label className="label" htmlFor="email">E-mail</label>
                                <input className="input" type="email" name="email" id="email" ref={userMail}/>
                            </div>
                            <div className="form__control">
                                <label className="label" htmlFor="password">Mot de passe</label>
                                <input className="input" type="password" name="password" id="password"
                                       ref={userPassword}/>
                            </div>
                        </div>
                        {error === true &&
                        <p className="errors">Mail ou mot de passe incorrect&nbsp;!</p>
                        }
                        <div className="form__control">
                            <button type="submit" className="btn__link__back"><span>Se connecter</span></button>
                        </div>
                    </form>
                    <div>
                        <Link to='/register' className="link__back">Je me crée un compte</Link>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default Login;
