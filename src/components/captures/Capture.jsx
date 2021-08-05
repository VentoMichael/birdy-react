import React, {useState, useContext, Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config.jsx';
import {AuthContext} from '../../context/Auth.jsx';

class Capture extends Component {
    state = {
        capture: {},
        id: '',
        loading: false,
    };

    componentDidMount() {
        const ref = firebase.firestore().collection('catches').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            this.setState({
                capture: doc.data(),
                id: doc.id,
                loading: true
            });
        });
    }

    render() {

        if (this.state.loading === false) {
            return <Redirect to={"/captures/" + this.props.match.params.id}/>
        }
        return (
            <React.Fragment>
                <section>
                    <div className="catch__name">
                        <h2 aria-level="2">{this.state.capture.name}</h2>
                        <div>
                            <Link className="link__back" to={{pathname: '/edit/' + this.props.match.params.id}}>Modifier {this.state.capture.name}
                            </Link>
                        </div>
                    </div>
                    <section className='general__infos_catch'>
                        <h3 aria-level="3">Informations générales</h3>
                        <div className="container__login container__catch__infos">
                            <div>
                                <p className="text__catch__bird">
                                    <span>Nom latin :</span> {this.state.capture.latin}</p>
                            </div>
                            <div>
                                <p className="text__catch__bird">
                                    <span>Date de la capture :</span> {this.state.capture.date}</p>
                            </div>
                            <div>
                                <p className="text__catch__bird">
                                    <span>Capture :</span> {this.state.capture.type}</p>
                            </div>
                            <div>
                                <p className="text__catch__bird">
                                    <span>Numéro de bague :</span> {this.state.capture.number}</p>
                            </div>
                            <div>
                                <p className="text__catch__bird">
                                    <span>Lieu de la capture :</span> {this.state.capture.place}</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 aria-level="3">Caractéristiques</h3>
                        <div className="container__login container__catch__infos">
                            <div>
                                <p className="text__catch__bird"><span>Poids : </span>
                                    {this.state.capture.weight} grammes</p>
                            </div>
                            <div>
                                <p className="text__catch__bird"><span>Envergure : </span>
                                    {this.state.capture.size} centimètres</p>
                            </div>
                            <div>
                                <p className="text__catch__bird"><span>Sexe : </span>
                                    {this.state.capture.sexe}</p>
                            </div>
                            <div>
                                <p className="text__catch__bird"><span>Adiposité : </span>
                                    {this.state.capture.adiposity} couche(s) de graisse(s)</p>
                            </div>
                            <div>
                                <p className="text__catch__bird"><span>Âge : </span>
                                    {this.state.capture.age}</p>
                            </div>
                        </div>
                    </section>
                </section>
            </React.Fragment>
        );
    }
}

export default Capture;