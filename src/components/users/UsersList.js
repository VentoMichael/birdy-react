import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config';

const UserList = () => {
    const [leState, setleState] = useState([]);
    const [isLogged, setisLogged] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () => {
            const db = firebase.firestore();
            const getData = await db.collection('users').get();
            setleState (getData.docs.map (doc => ({...doc.data(), id: doc.id})));
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
    return (
        <React.Fragment>
            <section>
                <h2>Tous les utilisateurs</h2>
                <ul className="list">
                    {leState.map(user => (
                        <li key={user.id} className="list__item">
                            <Link to={{pathname: '/users/' + user.id}} className="link_over">
                                <span>Plus d'informations sur {user.name}</span></Link>
                            <p>{user.name}</p>
                        </li>
                    ))}
                </ul>
            </section>

        </React.Fragment>
    )
};

export default UserList;
