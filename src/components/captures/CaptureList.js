import React, { useState, useEffect } from 'react';
import {Link, Redirect } from "react-router-dom";
import firebase from '../../config/config';

const CaptureList = () => {
    const [leState, setleState] = useState(null);
    const [isLogged, setisLogged] = useState([]);
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    useEffect(() =>
    {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection('captures').where("userUid", "==", uid).get();
            setleState (data.docs.map (doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);

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
    if (leState === null) {
        return <Redirect to='/captures'/>
    }
    return (
        <React.Fragment>
            <section>
                <div>
                    <h2>Toutes mes captures</h2>
                    <ul className="list">
                        {leState.map(bird => (
                            <li key={bird.id} className="list__item">
                                <Link to={{pathname: '/captures/' + bird.id}}><span className="hidden">Plus d'informations sur {bird.name}</span></Link>
                                <Link to={{pathname: '/edit/' + bird.id}} className="icon"><span className="sro">Modifier</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="#606a73" strokeWidth="1.5" strokeLinecap="round"
                                         strokeLinejoin="round" className="feather feather-edit-3">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                </Link>
                            </li>
                        ))}
                        {leState.length === 0 &&
                        <li className="empty">Vous n'avez pas encore capturé d'oiseau&nbsp;!</li>
                        }
                    </ul>
                </div>
            </section>

        </React.Fragment>
    )
};

export default CaptureList;
