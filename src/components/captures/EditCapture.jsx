import React, {Component} from 'react';
import firebase from '../../config/config';
import {Redirect} from "react-router-dom";

class EditCapture extends Component {

    state = {
        capture: {},
        reprise: '',
        latin: '',
        type: '',
        date: '',
        place: '',
        name: '',
        number: '',
        size: '',
        weight: '',
        adiposity: '',
        sexe: '',
        age: '',
        id: '',
        loading: false,
        empty: false,
        succes: false,
        uid: firebase.auth().currentUser.uid
    };

    saveChange = (e) => {
        e.preventDefault();
        if (this.state.reprise === '' || this.state.type === '' || this.state.date === '' || this.state.place === '' || this.state.name === '' || this.state.latin === '' || this.state.number === '' ||
            this.state.size === '' || this.state.weight === '' || this.state.adiposity === '' || this.state.sexe === '' || this.state.age === '') {
            this.setState({empty: true});
        } else {
            this.setState({empty: false});
            firebase.firestore().collection('catches').doc(this.props.match.params.id).set(
                {
                    reprise: this.state.reprise,
                    type: this.state.type,
                    date: this.state.date,
                    place: this.state.place,
                    name: this.state.name,
                    latin: this.state.latin,
                    number: this.state.number,
                    size: this.state.size,
                    weight: this.state.weight,
                    adiposity: this.state.adiposity,
                    sexe: this.state.sexe,
                    age: this.state.age,
                    userUid: this.state.uid
                }
            );
            this.setState({succes: true});
        }

    };

    render() {

        if (this.state.succes === true) {
            return <Redirect to={{pathname: '/captures/' + this.props.match.params.id}}/>
        }
        if (this.state.loading === false) {
            return <Redirect to={{pathname: '/edit/' + this.props.match.params.id}}/>
        }
        if (this.state.uid === this.state.capture.userUid) {
            return (
                <React.Fragment>
                    <section>
                        <h2 aria-level="2">Modification de {this.state.name}</h2>
                        <form className="container__login" action="#" method="POST" onSubmit={this.saveChange}>
                            <div className="container__form_edition_bird">
                                <label htmlFor="name">Nom de l'oiseau</label>
                                <input onChange={this.handleName} type="text" name="name" id="name"
                                       defaultValue={this.state.capture.name}/>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="latin">Nom latin</label>
                                <input onChange={this.handleLatin} type="text" name="latin" id="latin"
                                       defaultValue={this.state.capture.latin}/>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="reprise">Reprise</label>
                                <select onChange={this.handleReprise} name="reprise" id="reprise"
                                        defaultValue={this.state.capture.reprise}>
                                    <option defaultValue="oui">Oui</option>
                                    <option defaultValue="non">Non</option>
                                </select>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="number">Numéro de bague</label>
                                <input onChange={this.handleNum} type="text" id="number" name="number"
                                       defaultValue={this.state.capture.number}/>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="type">Comment a-t-il été capturé&nbsp;?</label>
                                <select onChange={this.handleType} name="type" id="type"
                                        defaultValue={this.state.capture.type}>
                                    <option defaultValue="nid">Au nid</option>
                                    <option defaultValue="filet">Au filet</option>
                                    <option defaultValue="autre">Autre</option>
                                </select>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="date">Date de la capture</label>
                                <input onChange={this.handleDate} type="date" id="date" name="date"
                                       defaultValue={this.state.capture.date}/>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="where">Lieu de la capture</label>
                                <input onChange={this.handlePlace} type="text" id="where" name="where"
                                       defaultValue={this.state.capture.place}/>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="size">Longueur alaire</label>
                                <div className="container__input__edition">
                                    <input onChange={this.handleSize} className="form__input_small" type="number"
                                           id="size" name="size" defaultValue={this.state.capture.size}/>
                                    <span>centimètres</span>
                                </div>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="weight">Poids</label>
                                <div className="container__input__edition">
                                    <input onChange={this.handleWeight} className="form__input_small" type="number"
                                           id="weight" name="weight" defaultValue={this.state.capture.weight}/>
                                    <span>grammes</span>
                                </div>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="adiposity">Adiposité de l'oiseau</label>
                                <div className="container__input__edition">
                                    <select onChange={this.handleAdiposity} name="adiposity" id="adiposity"
                                            defaultValue={this.state.capture.adiposity}>
                                        <option defaultValue="1">1
                                        </option>
                                        <option defaultValue="2">2
                                        </option>
                                        <option defaultValue="3">3
                                        </option>
                                        <option defaultValue="4">4
                                        </option>
                                        <option defaultValue="5">5
                                        </option>
                                    </select>
                                    <span>couche de graisse</span>
                                </div>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="sexe">Femelle</label>
                                <select onChange={this.handleSexe} name="sexe" id="sexe"
                                        defaultValue={this.state.capture.sexe}>
                                    <option defaultValue="mâle">Mâle</option>
                                    <option defaultValue="femelle">Femelle</option>
                                </select>
                            </div>
                            <div className="container__form_edition_bird">
                                <label htmlFor="age">Âge de l'oiseau</label>
                                <select onChange={this.handleAge} name="age" id="age"
                                        defaultValue={this.state.capture.age}>
                                    <option defaultValue="jeune">Jeune</option>
                                    <option defaultValue="adulte">Adulte</option>
                                </select>

                            </div>
                            {this.state.empty === true &&
                            <p className="errors">Tous les champs doivent être remplis</p>
                            }
                            <div>
                                <button className="btn">Sauvegarder</button>
                            </div>
                        </form>
                    </section>
                </React.Fragment>
            );
        }
    }
}

export default EditCapture;
