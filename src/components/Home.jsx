import React, {useState, useContext, useEffect} from 'react';
import {Redirect, Link} from "react-router-dom";
import {AuthContext} from '../context/Auth.jsx';

import firebase from '../config/config.jsx';

const Home = () => {
    const [birds, setleBirds] = useState(null);
    const [user, setleUser] = useState([]);
    const [isLogged, setisLogged] = useState([]);
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
                    console.log('Error getting document', err);
                });
            const dataBird = await db.collection('catches').where("userUid", "==", uid).limit(3).get();
            setleBirds(dataBird.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);

    const disconnectUser = (e) => {
        firebase.auth().signOut();
        setisLogged(false);
    };

    if (isLogged === false) {
        return <Redirect to='/'/>
    }
    if (birds === null) {
        return <Redirect to='/home'/>
    }
    return (
        <React.Fragment>
            <section>
                <div className="home__container">
                    <div className="section__header">
                        <h2>Accueil</h2>
                        <p>{hour >= 18 ? "Bonsoir" : "Bonjour"} {user.name}&nbsp;!</p>
                        <button className="btn_disconnect" onClick={disconnectUser}>
                            <svg className="btn_disconnect_svg" height="512pt" viewBox="0 0 511 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m361.5 392v40c0 44.113281-35.886719 80-80 80h-201c-44.113281 0-80-35.886719-80-80v-352c0-44.113281 35.886719-80 80-80h201c44.113281 0 80 35.886719 80 80v40c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-40c0-22.054688-17.945312-40-40-40h-201c-22.054688 0-40 17.945312-40 40v352c0 22.054688 17.945312 40 40 40h201c22.054688 0 40-17.945312 40-40v-40c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm136.355469-170.355469-44.785157-44.785156c-7.8125-7.8125-20.476562-7.8125-28.285156 0-7.8125 7.808594-7.8125 20.472656 0 28.28125l31.855469 31.859375h-240.140625c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h240.140625l-31.855469 31.859375c-7.8125 7.808594-7.8125 20.472656 0 28.28125 3.90625 3.90625 9.023438 5.859375 14.140625 5.859375 5.121094 0 10.238281-1.953125 14.144531-5.859375l44.785157-44.785156c19.496093-19.496094 19.496093-51.214844 0-70.710938zm0 0"/></svg>
                        </button>
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
                                        <Link className="link__back" to={{pathname: '/captures/' + bird.id}}>
                                            Plus d'informations sur <span>{bird.name}</span>
                                        </Link>
                                        <Link className="link__back" to={{pathname: '/edit/' + bird.id}}>
                                            Modifier <span>{bird.name}</span>
                                        </Link>
                                    </li>
                                ))}
                                {birds.length === 0 &&
                                <li className="empty">Vous n'avez pas encore capturé d'oiseau&nbsp;! </li>
                                }
                            </ul>
                            {birds.length >= 1 &&
                            <Link to={'/captures'} className="btn btn__catch">Voir toutes les captures</Link>
                            }
                        </section>
                    </section>
                </div>

            </section>
        </React.Fragment>
    )
};

export default Home;
