import React, {Component} from 'react';
import {Redirect, Link} from "react-router-dom";
import firebase from '../../config/config.jsx';
import GMap from '../common/GoogleMap.jsx';
import Image from '../common/Image.jsx';
import Audio from '../common/Audio.jsx';

class BirdDescription extends Component {
    state = {
        bird: {},
        id: '',
    };

    componentDidMount() {
        firebase.firestore().collection('encyclopedia').doc(this.props.match.params.id).get().then((doc) => {
            this.setState({
                bird: doc.data(),
                id: doc.id,
            });
        });
    }
    render() {
            return (
                <React.Fragment>
                    <div>
                        <Link to="/encyclopedia" className="link__back">
                            <p>Retour à l'encyclopédie</p>
                        </Link>
                    </div>
                    <section>
                        <h2 aria-level="2" className="name__of__bird">
                            {this.state.bird.name}
                            <span className="latin__name__of__bird">
                                 ({this.state.bird.latin})
                            </span>
                        </h2>
                        <div className="ency__single__bird">
                            {this.state.bird.img ? <Image img={"/encyclopedia/birds/" + this.state.bird.img} width={300} height={225} alt={"Photo de profil de " + this.state.bird.name} /> : "Aucune photo d'oiseau"}
                        </div>
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
                                        <p>{this.state.bird.weight} <abbr title="grammes">g</abbr></p>
                                    </section>
                                    <section className="grid__child__characteristic">
                                        <h4 aria-level="4">Taille</h4>
                                        <p>{this.state.bird.height} <abbr title="centimètre">cm</abbr></p>
                                    </section>
                                    <section className="grid__child__characteristic">
                                        <h4 aria-level="4">Envergure</h4>
                                        <p>{this.state.bird.envergure} <abbr title="centimètre">cm</abbr></p>
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
                                    {this.state.bird.alimentation ? this.state.bird.alimentation.map((item, id) =>
                                        <p key={id}>{item},</p>
                                    ) : '/'}
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
                                <div className="ency__definition ency__definition--map">{this.state.bird.distribution ? <GMap initialPos={{ lat: 50.63093493440036, lng: 5.5671638926487175 }} positions={this.state.bird.distribution} zoom={8} getCoordinates={true} /> : '/'}</div>
                            </section>
                            <section className="box__container">
                                <h3 aria-level="3" className="audio__title">Chant</h3>
                                <div className="ency__definition">{this.state.bird.chipping ? <Audio audio={this.state.bird.chipping} /> : '/'}</div>
                            </section>
                        </div>
                    </section>
                </React.Fragment>
            );
    }
}

export default BirdDescription;
