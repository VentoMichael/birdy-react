import React, {Component} from 'react';
import {Redirect, Link} from "react-router-dom";
import firebase from '../../config/config';

class BirdDescription extends Component {
    state = {
        bird: {},
        id: '',
    };

    componentDidMount() {
        const ref = firebase.firestore().collection('encyclopedia').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            this.setState({
                bird: doc.data(),
                id: doc.id,
            });
        });
    }

    render() {
        let user = firebase.auth().currentUser;
        if (user) {
            return (
                <React.Fragment>
                    <div>
                        <Link to="/encyclopedia" className="link__back">
                            <p>Retour à l'encyclopédie</p>
                        </Link>
                    </div>
                    <section>
                        <h2 className="name__of__bird">
                            {this.state.bird.name}
                            <span className="latin__name__of__bird">
                                 ({this.state.bird.latin})
                            </span>
                        </h2>
                        <img className="single__bird__img" width="300px" src={this.state.bird.img} alt={"Photo de profil de " + this.state.bird.name}/>
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
                                <div className="grid__parent__characteristic">
                                    <section className="grid__child__characteristic">
                                        <h4 aria-level="4">Poids</h4>
                                        <p>{this.state.bird.weight} g</p>
                                    </section>
                                    <section className="grid__child__characteristic">
                                        <h4 aria-level="4">Taille</h4>
                                        <p>{this.state.bird.heigth} cm</p>
                                    </section>
                                    <section className="grid__child__characteristic">
                                        <h4 aria-level="4">Envergure</h4>
                                        <p>{this.state.bird.size} cm</p>
                                    </section>
                                    <section className="grid__child__characteristic">
                                        <h4 aria-level="4">Famille</h4>
                                        <p>{this.state.bird.family}</p>
                                    </section>
                                    <section className="grid__child__characteristic">
                                        <h4 aria-level="4">Type de vol</h4>
                                        <p>{this.state.bird.fly}</p>
                                    </section>
                                    <section className="grid__child__characteristic">
                                        <h4 aria-level="4">Durée de vie</h4>
                                        <p>{this.state.bird.lifetime}</p>
                                    </section>
                                </div>
                            </section>
                            <section className="box__container container__alimentation">
                                <h3 aria-level="3" className="alimentation__title">Alimentation</h3>
                                <p>
                                    {this.state.bird.alimentation}
                                </p>
                            </section>
                            <section className="box__container container__house">
                                <h3 aria-level="3" className="house__title">Habitat</h3>
                                <p>
                                    {this.state.bird.habitat}
                                </p>
                            </section>
                            <section className="box__container container__map">
                                <h3 aria-level="3" className="house__title">Distribution</h3>
                                <p>
                                    {this.state.bird.distribution}
                                </p>
                            </section>
                            <section className="box__container">
                                <h3 aria-level="3" className="audio__title">Chant</h3>
                                <audio controls id="audio" src="/media/cc0-audio/t-rex-roar.mp3">
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
