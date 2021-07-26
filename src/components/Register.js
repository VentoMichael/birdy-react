import React, {useEffect, useRef, useState} from 'react';
import { Redirect} from "react-router-dom";
import firebase from '../config/config';

const Register = () => {
    const userMail = useRef('');
    const userId = useRef('');
    const userName = useRef('');
    const userPassword = useRef('');
    const [isCreated, setisCreated] = useState(false);
    const [emailUse, setEmailUse] = useState(false);
    const [weakPass, setWeakPass] = useState(false);
    const [emptyField, setEmptyField] = useState(false);
    const [emailError, setEmailError] = useState(false);

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
        firebase.firestore().collection('users').doc().set({
            name:name,
            email:mail,
            id:id}
        );
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
                    <h2 className="title__login">Formulaire d'inscription</h2>
                    {emptyField === true &&
                    <p className="errors">Tous les champs doivent être remplis</p>
                    }
                    <form action="#" method="POST" className="form form__login" onSubmit={createUser}>
                        <div className="form__control">
                            <label className="label" htmlFor="name">Nom</label>
                            <input className="input" type="text" name="name" id="name" placeholder="Marco Polo" ref={userName}/>
                        </div>

                        <div className="form__control">
                            <label className="label" htmlFor="userId">ID fourni par l'institut des Sciences Naturelles</label>
                            <input className="input" type="text" name="userId" id="userId" placeholder="0123456789" ref={userId}/>
                        </div>

                        <div className="form__control">
                            {emailError === true &&
                            <p className="errors">Veuillez entrer une adresse mail valide</p>
                            }
                            {emailUse === true &&
                            <p className="errors">Il existe déja un compte avec cet email</p>
                            }
                            <label className="label" htmlFor="email">E-mail</label>
                            <input className="input" type="email" name="email" id="email" placeholder="marcopolo@email.com" ref={userMail}/>

                        </div>

                        <div className="form__control password__input">
                            {weakPass === true &&
                            <p className="errors">Le mot de passe doit avoir 6 caractères minimum</p>
                            }
                            <label className="label" htmlFor="password">Mot de passe</label>
                            <input className="input" type="password" name="password" id="password" ref={userPassword}/>
                            <button className="show__pass" type="button" onClick={showPassword}>
                                <span className="sro">Montrer le mot de passe</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#606a73" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                        </div>

                        <div className="form__control">
                            <button type="submit" className="btn">S'inscrire</button>
                        </div>
                    </form>
                </div>
            </section>
        </React.Fragment>
    )
};

export default Register;
