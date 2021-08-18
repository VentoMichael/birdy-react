import React, {useState, useContext, useEffect} from 'react';
import {Redirect, Link} from "react-router-dom";
import {AuthContext} from '../context/Auth.jsx';

import firebase from '../config/config.jsx';

const Home = () => {
    const [birds, setleBirds] = useState(null);
    const [user, setleUser] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const uid = currentUser.uid;
    const date = new Date();
    let hour = date.getHours();

    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const dataUser = db.collection('users').doc(uid);
            dataUser.get()
                .then(doc => {
                    setleUser(doc.data());
                })
                .catch(err => {
                    console.log('Erreur dans l\'obtention du document', err);
                });
            const dataBird = await db.collection('catches').where("userUid", "==", uid).limit(3).get();
            setleBirds(dataBird.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);
    const disconnectUser = (e) => {
        firebase.auth().signOut();
    };
    if (birds === null) {
        return <Redirect to='/home'/>
    }
    return (
        <React.Fragment>
            <section>
                <div className="home__container">
                    <div className="section__header">
                        <div>
                            <h2>Accueil</h2>
                            <p>{hour >= 18 ? "Bonsoir" : "Bonjour"} {user.name}&nbsp;!</p>
                        </div>
                        <div className="container__home">
                            <button className="btn__link__back" onClick={disconnectUser}>
                                <span>Se déconnecter</span>
                            </button>
                        </div>
                    </div>
                    <section>
                        <div>
                            <h3>Voici vos dernières captures</h3>
                        </div>
                        <section className="container__catches_home">
                            <ul className="list__birds_home">
                                {birds.map(bird => (
                                    <li key={bird.id} className="list__bird_home">
                                        <h4 aria-level="4">{bird.name}</h4>
                                        <Link className="btn__link__back" to={{pathname: '/captures/' + bird.id}}>
                                            <span>Plus d'informations sur {bird.name}</span>
                                        </Link>
                                        <Link className="btn__link__back" to={{pathname: '/edit/' + bird.id}}>
                                            <span>Modifier {bird.name}</span>
                                        </Link>
                                    </li>
                                ))}
                                {birds.length === 0 &&
                                <li className="empty">Vous n'avez pas encore capturé d'oiseau&nbsp;! </li>
                                }
                            </ul>
                            {birds.length >= 1 &&
                            <Link to={'/captures'}
                                  className="btn__link__back container__all_catches"><span>Voir toutes mes captures</span></Link>
                            }
                        </section>
                    </section>
                </div>
            </section>
        </React.Fragment>
    )
};

export default Home;
