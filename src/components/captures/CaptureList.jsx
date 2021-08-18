import React, {useState, useContext, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config.jsx';
import {AuthContext} from '../../context/Auth.jsx';

const CaptureList = () => {
    const [leState, setleState] = useState(null);
    const {currentUser} = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection('catches').where('userUid', '==', currentUser ? currentUser.uid : '').get();
            setleState(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        };

        fetchData();
    }, []);
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
                                    <Link className="btn__link__back" to={{pathname: '/captures/' + bird.id}}>
                                        <span>Plus
                                        d'informations sur {bird.name}</span></Link>
                                    <Link className="btn__link__back"
                                          to={{pathname: '/edit/' + bird.id}}>
                                        <span>Modifier {bird.name}</span>
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
                    <Link to='/capture/new' className="btn__link__back">
                        <span>Ajouter une nouvelle
                        capture</span></Link>
                </section>
            </section>

        </React.Fragment>
    )
};

export default CaptureList;
