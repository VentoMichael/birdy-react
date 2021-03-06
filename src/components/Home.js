import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";

import firebase from '../config/config';

const Home = () => {
    const [user, setleUser] = useState([]);
    const [isLogged, setisLogged] = useState([]);
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;

    useEffect(() =>
    {
        const fetchData = async () => {
            const db = firebase.firestore();
            const dataUser = db.collection('users').doc(uid);
            dataUser.get()
                .then(doc => {
                    setleUser( doc.data());
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
        };
        fetchData();
    }, [uid]);

    const disconnectUser = (e) => {
        firebase.auth().signOut();
        setisLogged(false);
    };

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setisLogged(true);
        } else {
            setisLogged(false);
        }
    });
    if(isLogged === false){
        return <Redirect to='/'/>
    }
    return (
        <React.Fragment>
            <section>
                <div className="home__container">
                    <div className="header__container">
                        <h2 className="sro">Accueil</h2>
                        <p>Bonjour {user.name}&nbsp;!</p>
                        <button className="btn_disconnect" onClick={disconnectUser}>
                            <svg className="btn_disconnect_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4d4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default Home;
