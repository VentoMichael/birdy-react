import React, {Component} from 'react';
import {Redirect, Link} from "react-router-dom";
import firebase from '../../config/config';
import Loader from "../common/Loader";

class BirdDescription extends Component {
    state = {
        bird: {},
        id: '',
        loading: false,
    };

    componentDidMount() {
        const ref = firebase.firestore().collection('encyclopedia').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            this.setState({
                bird: doc.data(),
                id: doc.id,
                loading: true
            });
        });
    }

    render() {
        let user = firebase.auth().currentUser;
        if (this.state.loading === false) {
            return <Loader/>
        }
        if (user) {
            return (
                <React.Fragment>
                    <div>
                        <Link to="/encyclopedia" className="link__back">
                            <p>Retour à l'encyclopédie</p>
                        </Link>
                    </div>
                    <section>
                        <img id="bird_img" className="single__bird__img" width="300px" alt={this.state.bird.name}/>
                        <h2 className="name__of__bird">{this.state.bird.name} <span className="latin__name__of__bird">({this.state.bird.latin})</span></h2>

                        <div className="container__login">
                            <section className="box__container container__description">
                                <h3 aria-level="3" className="description__title">Description</h3>
                                <p>{this.state.bird.description}</p>
                            </section>

                            <section className="box__container container__nidification">
                                <h3 aria-level="3" className="nidification__title">Nidification</h3>
                                <p>
                                    {this.state.bird.nidification}
                                </p>
                            </section>
                            <section className="box__container container__characteristic">
                                <h3 aria-level="3" className="characteristic__title">Caractéristiques</h3>
                                <section className="grid__parent__characteristic">
                                    <div className="grid__child__characteristic">
                                        <h4 aria-level="4">Poids</h4>
                                        <p>{this.state.bird.weight} g</p>
                                    </div>
                                    <div className="grid__child__characteristic">
                                        <h4 aria-level="4">Taille</h4>
                                        <p>{this.state.bird.heigth} cm</p>
                                    </div>
                                    <div className="grid__child__characteristic">
                                        <h4 aria-level="4">Envergure</h4>
                                        <p>{this.state.bird.size} cm</p>
                                    </div>
                                    <div className="grid__child__characteristic">
                                        <h4 aria-level="4">Ordre</h4>
                                        <p>{this.state.bird.order}</p>
                                    </div>
                                    <div className="grid__child__characteristic">
                                        <h4 aria-level="4">Famille</h4>
                                        <p>{this.state.bird.family}</p>
                                    </div>
                                    <div className="grid__child__characteristic">
                                        <h4 aria-level="4">Espèce</h4>
                                        <p>{this.state.bird.species}</p>
                                    </div>
                                </section>
                            </section>
                            <section className="box__container container__alimentation">
                                <h3 aria-level="3" className="alimentation__title">Alimentation</h3>
                                <p>
                                    {this.state.bird.food}
                                </p>
                            </section>
                            <section className="box__container container__house">
                                <h3 aria-level="3" className="house__title">Habitat</h3>
                                <p>
                                    {this.state.bird.living}
                                </p>
                            </section>
                            <section className="box__container container__audio__bird">
                                <h3 aria-level="3" className="audio__title">Chant</h3>
                                <audio controls id="audio">
                                    Your browser does not support the
                                    <code>audio</code> element.
                                </audio>
                            </section>
                        </div>
                    </section>
                </React.Fragment>
            );
        } else {
            return <Redirect to='/'/>
        }
    }
}

export default BirdDescription;
