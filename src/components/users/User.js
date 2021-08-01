import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config';

class User extends Component {
    state = {
        user: {},
        birds: [],
        sites: [],
        id: '',
    };

    componentDidMount() {
        const user = firebase.firestore().collection('users').doc(this.props.match.params.id);
        user.get().then((doc) => {
            this.setState({
                user: doc.data(),
                id: doc.id,
            });
        });
        const birds = firebase.firestore().collection('catches').where("email", "==", this.props.match.params.id);
        birds.get().then((doc) => {
            this.setState({
                birds: doc.docs.map(doc => ({...doc.data(), id: doc.id}))
            });
        });
        const sites = firebase.firestore().collection('sites').where("email", "==", this.props.match.params.id);
        sites.get().then((doc) => {
            this.setState({
                sites: doc.docs.map(doc => ({...doc.data(), id: doc.id}))
            });
        });
    }

    render() {
        const {birds, sites, user} = this.state;
        let curuser = firebase.auth().currentUser;

        if (curuser) {
            return (
                <React.Fragment>
                    <section>
                        <div>
                            <Link to="/users" className="link__back">
                                <p>Retour aux utilisateurs</p>
                            </Link>
                        </div>
                        <div>

                        </div>
                        <div className="container__login container__user">
                            <div className="container__infos__user">
                                <h2 aria-level="2">{user.name}</h2>
                                <img src={user.avatar} className="users__img" width="90px" height="90px"
                                     alt={"Photo de profil de " + user.name}/>
                                <p>{user.userId}</p>
                            </div>
                            <div className="container__catches__user">
                                <section>
                                    <h3 className="section_subtitle">Toutes les captures de {user.name}</h3>
                                    <ul className="list">
                                        {birds.map(bird => (
                                            <li key={bird.id} className="list__item">
                                                <Link to={{pathname: '/captures/' + bird.id}}><span>Voir</span>
                                                    <p>{bird.name}</p>
                                                </Link>
                                                <Link to={{pathname: '/captures/' + bird.id}}
                                                      className="icon"><span>Modifier</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="#606a73"
                                                         strokeWidth="1.5"
                                                         strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </svg>
                                                </Link>
                                            </li>
                                        ))}
                                        {birds.length === 0 &&
                                        <div>{this.state.user.name} n'a pas encore capturé d'oiseau&nbsp;! </div>
                                        }
                                    </ul>
                                </section>
                                <section>
                                    <h3 className="section_subtitle">Tous les sites de {user.name}</h3>
                                    <ul className="list">
                                        {sites.map(site => (
                                            <li key={site.id} className="list__item">
                                                <p>{site.name}</p>
                                                <ul className="list__details">
                                                    <li>latitude&nbsp;: {site.geopoint.latitude}</li>
                                                    <li>longitude&nbsp;: {site.geopoint.longitude}</li>
                                                    <li>{site.superficie} km</li>
                                                </ul>

                                            </li>
                                        ))}
                                        {sites.length === 0 &&
                                        <div>{user.name} n'a pas encore ajouter de site&nbsp;! </div>
                                        }
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            );
        } else {
            return <Redirect to='/'/>
        }
    }
}

export default User;
