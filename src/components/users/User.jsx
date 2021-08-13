import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config.jsx';
import Image from '../common/Image.jsx';

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
                loading: true
            });
        });
        const birds = firebase.firestore().collection('catches').where("userUid", "==", this.props.match.params.id);
        birds.get().then((doc) => {
            this.setState({
                birds: doc.docs.map(doc => ({...doc.data(), id: doc.id}))
            });
        });
        const sites = firebase.firestore().collection('sites').where("userUid", "==", this.props.match.params.id);
        sites.get().then((doc) => {
            this.setState({
                sites: doc.docs.map(doc => ({...doc.data(), id: doc.id}))
            });
        });
    }

    render() {
        const {birds, sites, user} = this.state;
        let currentUser = firebase.auth().currentUser;
            return (
                <React.Fragment>
                    <section>
                        <div>
                            <Link to="/users" className="link__back">
                                <p>Retour aux utilisateurs</p>
                            </Link>
                        </div>
                        <div className="container__login container__user">
                            <div className="container__infos__user">
                                <h2 aria-level="2">{user.userUid === currentUser.uid ? 'Moi' : user.name}</h2>
                                <div className="users__img">{user.avatar ?
                                    <Image img={"/users/" + user.avatar} width={300} height={225}
                                           alt={"Photo de profil de " + user.name}/> :
                                    <Image img={"/users/avatar2.png"} width={300} height={225}
                                           alt={"Photo de profil par défault"}/>}</div>
                            </div>
                            <div className="container__catches__user">
                                <section>
                                    <h3 aria-level="3">
                                        {user.userUid === currentUser.uid ? 'Toutes mes captures' : 'Toutes les captures de ' + user.name}
                                    </h3>
                                    <ul className="container__listes__users">
                                        {birds.map(bird => (
                                            <li key={bird.id}>
                                                <Link className="link__back"
                                                      to={{pathname: '/captures/' + bird.id}}>Voir {bird.name}</Link>
                                                <p></p>
                                            </li>
                                        ))}
                                        {birds.length === 0 &&
                                        <div>{user.userUid === currentUser.uid ? 'Je n\'ai' : this.state.user.name + 'n\'a'} pas
                                            encore capturé d'oiseau&nbsp;! </div>
                                        }
                                        {user.userUid === currentUser.uid &&
                                        <Link className="link__back" to={'/capture/new'}>Je rajoute une capture</Link>
                                        }
                                    </ul>
                                </section>
                                <section>
                                    <h3 aria-level="3">{user.userUid === currentUser.uid ? 'Tous mes sites' : 'Tous les sites de ' + user.name}</h3>
                                    <ul className="container__listes__users">
                                        {sites.map(site => (
                                            <li key={site.id}>
                                                <p>{site.name}</p>
                                                <ul>
                                                    <li>La latitude: {site.geopoint.latitude}</li>
                                                    <li>La longitude: {site.geopoint.longitude}</li>
                                                    <li>La superficie {site.superficie} <abbr
                                                        title="kilometres">km</abbr></li>
                                                </ul>

                                            </li>
                                        ))}
                                        {sites.length === 0 &&
                                        <div>
                                            <p>
                                                {user.userUid === currentUser.uid ? 'Je n\'ai pas encore de site' : user.name + ' n\'a pas encore ajouter de site!'}
                                            </p>
                                        </div>
                                        }
                                        {user.userUid === currentUser.uid &&
                                        <Link className="link__back" to={'/sites/new'}>Je rajoute un site</Link>
                                        }
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            );
    }
}

export default User;
