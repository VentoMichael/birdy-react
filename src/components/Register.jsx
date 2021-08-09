import React, {useEffect, useRef, useContext, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../config/config.jsx';
import { AuthContext } from '../context/Auth.jsx';

const Register = () => {
    const userMail = useRef('');
    const userId = useRef('');
    const userName = useRef('');
    const userPassword = useRef('');
    const [isCreated, setisCreated] = useState(false);
    const [emptyField, setEmptyField] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [idScience, setIdScience] = useState(false);
    const [emailUse, setEmailUse] = useState(false);
    const [weakPass, setWeakPass] = useState(false);
    const {currentUser} = useContext(AuthContext);

    const createUser = (e) => {
        e.preventDefault();
        const name = userName.current.value;
        const id = userId.current.value;
        const mail = userMail.current.value;
        const password = userPassword.current.value;

        if (mail === "" || name === "" || password === "" || id === "") {
            setEmptyField(true)
        } else {
            firebase.auth().createUserWithEmailAndPassword(mail, password)
                .then(user => {
                    storeUser(user, mail, name, id);
                    setisCreated(true);
                })
                .catch(error => {
                    setisCreated(false);
                    if (error.code === 'auth/invalid-email'){
                        setEmailError(true)
                    }
                    if (error.code === 'auth/email-already-in-use'){
                        setEmailUse(true)
                    }
                    if (error.code === 'auth/weak-password'){
                        setWeakPass(true)
                    }
                    if (!/[0-9]{4}[a-zA-Z]{2}/.test(id))
                    {
                        setIdScience(true)
                    }
                });
        }
    };

    const showPassword = () => {
        const password = document.getElementById("password");
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    };

    const storeUser = (user, mail, name, id) => {
        const uid = user.user.uid;
        firebase.firestore().collection('users').doc(uid).set({
            name:name,
            email:mail,
            userId:id,
            userUid:uid});
    };

    useEffect(() =>
    {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                setisCreated(true);
            } else {
                setisCreated(false);
            }
        })
    }, []);

    if(isCreated === true){
        return <Redirect to='/home' />
    }

    return (
        <React.Fragment>
            <section>
                <div className="form__container">
                    <h2 aria-level="2" className="title__login">Formulaire d'inscription</h2>
                    <form action="#" method="POST" className="form container__login form_register" onSubmit={createUser}>
                            <div className='container__form_edition_bird'>
                                <label htmlFor="name">Nom</label>
                                <input type="text" name="name" id="name" placeholder="Marco Polo"
                                       ref={userName}/>
                            </div>

                            <div className='container__form_edition_bird'>
                                <label htmlFor="userId">ID fourni par l'institut des Sciences
                                    Naturelles</label>
                                <input type="text" name="userId" id="userId" placeholder="1234AB"
                                       ref={userId}/>
                                {idScience === true &&
                                <p className="errors">Oops! L' identifiant n’est pas valide! (4 lettres et 2 chiffres)
                                </p>
                                }
                            </div>

                            <div className='container__form_edition_bird'>
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" id="email"
                                       placeholder="marcopolo@email.com" ref={userMail}/>
                                {emailError === true &&
                                <p className="errors">Veuillez entrer une adresse mail valide</p>
                                }
                                {emailUse === true &&
                                <p className="errors">Cet email est déjà lié à un compte, <Link to="/login" className="link__back">
                                    <span>je me connecte</span></Link></p>
                                }
                            </div>

                            <div className="container__form_edition_bird password__input">

                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" name="password" id="password"
                                       ref={userPassword}/>
                                <button className="show__pass" type="button" onClick={showPassword}>
                                    <span className="hidden">Montrer le mot de passe</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="#606a73" strokeWidth="1.5" strokeLinecap="round"
                                         strokeLinejoin="round" className="feather feather-eye">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                                {weakPass === true &&
                                <p className="errors">Le mot de passe doit avoir 6 caractères minimum</p>
                                }
                            </div>
                        <div>
                            <button type="submit" className="btn">S'inscrire</button>
                        </div>
                        {emptyField === true &&
                        <p className="errors">Tous les champs doivent être remplis</p>
                        }
                    </form>
                    <div>
                        <Link to='/' className="link__back">J'ai déjà un compte</Link>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default Register;



