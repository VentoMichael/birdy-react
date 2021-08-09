import React, {useState, useContext, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {AuthContext} from '../context/Auth.jsx';

import firebase from '../config/config.jsx';

const Home = () => {
    const [user, setleUser] = useState([]);
    const [birds, setleBirds] = useState(null);
    const [isLogged, setisLogged] = useState([]);
    const date = new Date();
    const {currentUser} = useContext(AuthContext);
    let hour = date.getHours();
    
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            db.collection('users')
                .where('email', '==', currentUser ? currentUser.email : '')
                .onSnapshot((snap) => {
                    snap.forEach((doc) => {
                        setleUser(doc.data().user);
                    });
                })
            const dataBird = await db.collection('captures').where("email", "==", currentUser ? currentUser.email : '').limit(3).get();
            setleBirds(dataBird.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);

    const disconnectUser = (e) => {
        firebase.auth().signOut();
        setisLogged(false);
    };
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            setisLogged(true);
        } else {
            setisLogged(false);
        }
    });
    if (isLogged === false) {
        return <Redirect to='/'/>
    }
    return (
        <React.Fragment>
            <section>
                <div className="home__container">
                    <div className="home__section">
                        <h2 aria-level="2" className="hidden">Accueil</h2>
                        <p>{hour >= 18 ? "Bonsoir" : "Bonjour"} {currentUser ? currentUser.name : ''} &nbsp;!</p>
                        <button className="btn_disconnect" onClick={disconnectUser}>
                            <svg className="btn_disconnect_svg" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default Home;
