import React, {useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config.jsx';
import Image from '../common/Image.jsx';

const BirdList = () => {
    const [leState, setleState] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const recupData = await db.collection('encyclopedia').get();
            setleState(recupData.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);
    if (leState === null) {
        return <Redirect to='/encyclopedia'/>
    }
    return (
        <React.Fragment>
            <section>
                <h2 aria-level="2">Encyclopédie</h2>
                <section>
                    <ul className="list container__encuclopedia">
                        {leState.map(bird => (
                            <li key={bird.id} className="list__item list__encyclopedia">
                                <h3 aria-level="3">
                                    {bird.name}
                                </h3>
                                <div className="encyclopedia__bird_picture">{bird.img ? <Image img={"/encyclopedia/birds/" + bird.img} width={300} height={225} alt={"Photo de profil de " + bird.name} /> : "Aucune photo d'oiseau"}</div>
                                <Link to={{pathname: '/encyclopedia/' + bird.id}} className="btn__link__back">
                                    <span>
                                        Accéder aux informations de {bird.name}
                                    </span>
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