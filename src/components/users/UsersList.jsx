import React, {useState, useEffect,useContext} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config.jsx';
import Image from '../common/Image.jsx';
import {AuthContext} from '../../context/Auth.jsx';

const UserList = () => {
    const [leState, setleState] = useState([]);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const getData = await db.collection('users').get();
            setleState(getData.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);
    return (
        <React.Fragment>
            <section>
                <h2 aria-level="2">Tous les utilisateurs</h2>
                <section>
                    <ul className="container__login container__users">
                        {leState.map(user => (
                            <li key={user.id} className="list__item">
                                <h3 aria-level="3">{user.id === currentUser.uid ? 'Moi' : user.name}</h3>
                                <div className="ency__definition">
                                    <div className="users__img">
                                        {user.avatar ? 
                                            <Image img={"/users/" + user.avatar} width={300} height={225} alt={"Photo de profil de " + user.name} /> : 
                                            <Image img={"/users/avatar2.png"} width={300} height={225} alt={"Photo de profil par défault"} />}
                                    </div>
                                </div>
                                <Link to={{pathname: '/users/' + user.id}} className="btn__link__back">
                                    <span>{user.id === currentUser.uid ? 'Mes informations' : 'Plus d\'informations sur ' + user.name}</span></Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </React.Fragment>
    )
};

export default UserList;
