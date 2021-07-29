import React, {useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config';
import Loader from "../common/Loader";

const BirdList = () => {
    const [leState, setleState] = useState(null);
    const [isLogged, setisLogged] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const recupData = await db.collection('encyclopedia').get();
            setleState(recupData.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);
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
    if (leState === null) {
        return <Loader/>
    }
    return (
        <React.Fragment>
            <section>
                <h2 aria-level="2">Encyclopédie</h2>
                <section>
                    <ul className="list">
                        {leState.map(bird => (
                            <li key={bird.id} className="list__item list__encyclopedia">
                                <h3 aria-level="3">
                                    {bird.name}
                                </h3>
                                <Link to={{pathname: '/encyclopedia/' + bird.id}} className="link__back">
                                <span className="hidden">
                                    Voir
                                </span>
                                    <img src='' className="encyclopedia__img" width="90px" height="90px"
                                         alt={bird.name}/>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </React.Fragment>
    )
};

export default BirdList;
