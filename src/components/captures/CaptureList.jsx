import React, {useState, useContext, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config.jsx';
import {AuthContext} from '../../context/Auth.jsx';

const CaptureList = () => {
    const [leState, setleState] = useState(null);
    const [isLogged, setisLogged] = useState([]);
    const {currentUser} = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection('catches').where('userUid', '==', currentUser ? currentUser.uid : '').get();
            setleState(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        };

        fetchData();
    }, []);
    firebase.auth().onAuthStateChanged(function (user) {
        if (currentUser) {
            setisLogged(true);
        } else {
            setisLogged(false);
        }
    });
    if (isLogged === false) {
        return <Redirect to='/'/>
    }
    if (leState === null) {
        return <Redirect to='/captures'/>
    }
    return (
        <React.Fragment>
            <section>
                <h2 aria-level="2">Toutes mes captures</h2>
                <section>
                    <div className="list__new__catches">
                        {leState.map(bird => (
                            <div key={bird.id}>
                                <h3 aria-level="3">{bird.name}</h3>
                                <div className="list__catch_edit">
                                    <Link className="link__back" to={{pathname: '/captures/' + bird.id}}>Plus
                                        d'informations sur {bird.name}</Link>
                                    <Link className="link__back"
                                          to={{pathname: '/edit/' + bird.id}}>Modifier {bird.name}
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {leState.length === 0 &&
                        <p>Oops, encore aucune capture d'oiseau&nbsp;!</p>
                        }
                    </div>
                    <h3 aria-level="3">
                        Ajout d'une capture
                    </h3>
                    <Link to='/capture/new' className="link__back link__add__new_catch">Ajouter une nouvelle
                        capture</Link>
                </section>
            </section>

        </React.Fragment>
    )
};

export default CaptureList;
