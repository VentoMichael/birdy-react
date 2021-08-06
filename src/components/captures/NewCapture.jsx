import React, {useState, useContext} from 'react';
import firebase from 'firebase';
import Feedback from "../common/Feedback";
import {AuthContext} from '../../context/Auth.jsx';

const NewCapture = () => {
    const [reprise, setReprise] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [place, setPlace] = useState('');
    const [name, setName] = useState('');
    const [latin, setLatin] = useState('');
    const [number, setNumber] = useState('');
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState('');
    const [adiposity, setAdiposity] = useState('');
    const [sexe, setSexe] = useState('');
    const [age, setAge] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [empty, setEmpty] = useState(false);
    const [succes, setSucces] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const uid = currentUser.uid;

    const handleReprise = (e) => {
        setReprise(e.target.value)
    };
    const handleType = (e) => {
        setType(e.target.value)
    };
    const handleAdiposity = (e) => {
        setAdiposity(e.target.value)
    };
    const handleSexe = (e) => {
        setSexe(e.target.value)
    };
    const handleAge = (e) => {
        setAge(e.target.value)
    };
    const handleLong = ({currentTarget: input}) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                input.value = Math.round(position.coords.longitude * 100) / 100;
                setLongitude(position.coords.longitude)
            });
        } else {
            const long = input.value;
            setLatitude(parseFloat(long))
        }

    };
    const handleLat = ({currentTarget: input}) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                input.value = Math.round(position.coords.latitude * 100) / 100;
                setLatitude(position.coords.latitude)
            });
        } else {
            const lat = input.value;
            setLatitude(parseFloat(lat))
        }
    };
    const saveNewBird = (e) => {
        e.preventDefault();
        if (reprise === '' || type === '' || date === '' || place === '' || name === '' || latin === '' || number === '' ||
            size === '' || weight === '' || adiposity === '' || sexe === '' || age === '') {
            setEmpty(true)
        } else {
            firebase.firestore().collection('catches').add({
                reprise: reprise,
                type: type,
                date: date,
                place: place,
                geopoint: new firebase.firestore.GeoPoint(latitude, longitude),
                name: name,
                latin: latin,
                number: number,
                size: size,
                weight: weight,
                adiposity: adiposity,
                sexe: sexe,
                age: age,
                userUid: uid
            }).then(function () {
                setSucces(true);
            }).catch(function (error) {
                setSucces(false);
                console.error("Error adding document: ", error);
            });
        }
    };

    if (succes === true) {
        return <Feedback/>
    }
    return (
        <React.Fragment>
            <section>
                <h2 aria-level="2">Enregistrement d'une nouvelle capture</h2>
                <form action="#" method="POST" className="container__login" onSubmit={saveNewBird}>
                    <div>
                        <fieldset>
                            <legend>Est-ce une reprise&nbsp;?</legend>
                            <div>
                                <input type="radio" id="repriseOui" name="reprise" value="oui"
                                       onChange={handleReprise}/>
                                <label htmlFor="repriseOui">Oui</label>
                            </div>
                            <div>
                                <input type="radio" id="repriseNon" name="reprise" value="non"
                                       onChange={handleReprise}/>
                                <label htmlFor="repriseNon">Non</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="container__form_edition_bird">
                        <label htmlFor="number">Quel est le numéro de bague&nbsp;?</label>
                        <input onChange={(e) => setNumber(e.target.value)} type="text" id="number" name="number"
                               placeholder="B 1822 003 CDE U195"/>
                    </div>
                    <div>
                        <fieldset>
                            <legend>Comment a-t-il été capturé&nbsp;?</legend>
                            <div>
                                <input type="radio" id="filet" name="type" value="filet" onChange={handleType}/>
                                <label htmlFor="filet">Au filet</label>
                            </div>
                            <div>
                                <input type="radio" id="nid" name="type" value="nid" onChange={handleType}/>
                                <label htmlFor="nid">Au nid</label>
                            </div>
                            <div>
                                <input type="radio" id="autre" name="type" value="autre" onChange={handleType}/>
                                <label htmlFor="autre">Autre</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="container__form_edition_bird">
                        <label htmlFor="date">Quand a-t-il été capturé&nbsp;?</label>
                        <input onChange={(e) => setDate(e.target.value)} type="date" id="date"
                               name="date"/>
                    </div>
                    <div className="container__form_edition_bird">
                        <label htmlFor="where">Où a-t-il été capturé&nbsp;?</label>
                        <input onChange={(e) => setPlace(e.target.value)} type="text" id="where"
                               name="where" placeholder="Liège"/>
                    </div>
                    <div className="container__form_edition_bird">
                        <label className="" htmlFor="longitude">Longitude&nbsp;:</label>
                        <input onChange={handleLong} type="number" step="0.01" min="-180"
                               max="180" id="longitude" name="longitude" placeholder="55.6"/>
                    </div>
                    <div className="container__form_edition_bird">
                        <label className="" htmlFor="latitude">Latitude&nbsp;:</label>
                        <input onChange={handleLat} type="number" step="0.01" min="-90"
                               max="90" id="latitude" name="latitude" placeholder="4.56"/>
                    </div>
                    <div className="container__form_edition_bird">
                        <label htmlFor="birdName">De quel oiseaux s'agit-il&nbsp;?</label>
                        <input onChange={(e) => setName(e.target.value)} type="text"
                               id="birdName" name="birdName" placeholder="Colibri"/>
                    </div>
                    <div className="container__form_edition_bird">
                        <label htmlFor="latinName">Quel est le nom latin&nbsp;?</label>
                        <input onChange={(e) => setLatin(e.target.value)} type="text"
                               id="latinName" name="latinName" placeholder="Nom latin"/>
                    </div>
                    <div className="container__form_edition_bird">
                        <label htmlFor="size">Longueur alaire</label>
                        <div className="container__input__edition">
                            <input onChange={(e) => setSize(e.target.value)} type="number"
                                   id="size" name="size" placeholder="7"/> <span>cm</span>
                        </div>
                    </div>
                    <div className="container__form_edition_bird">
                        <label htmlFor="weight">Poids</label>
                        <div className="container__input__edition">
                            <input onChange={(e) => setWeight(e.target.value)}
                                   type="number" id="weight" name="weight" placeholder="59"/> <span>grammes</span>
                        </div>
                    </div>
                    <div>
                        <fieldset>
                            <legend>quel est l'adiposité de l'oiseaux&nbsp;?</legend>
                            <div className="container__input__edition">
                                <div>
                                    <input type="radio" id="one" name="adiposity" value="1" onChange={handleAdiposity}/>
                                    <label htmlFor="one">1 <span>couche de graisse</span></label>
                                </div>
                                <div>
                                    <input type="radio" id="two" name="adiposity" value="2" onChange={handleAdiposity}/>
                                    <label htmlFor="two">2</label> <span>couches de graisse</span>

                                </div>
                                <div>
                                    <input type="radio" id="three" name="adiposity" value="3"
                                           onChange={handleAdiposity}/>
                                    <label htmlFor="three">3</label> <span>couches de graisse</span>

                                </div>
                                <div>
                                    <input type="radio" id="four" name="adiposity" value="4"
                                           onChange={handleAdiposity}/>
                                    <label htmlFor="four">4</label> <span>couches de graisse</span>

                                </div>
                                <div>
                                    <input type="radio" id="five" name="adiposity" value="5"
                                           onChange={handleAdiposity}/>
                                    <label htmlFor="five">5</label> <span>couches de graisse</span>

                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <legend>Quel est le sexe de l'oiseau&nbsp;?</legend>
                            <div>
                                <input type="radio" id="female" name="sexe" value="femelle" onChange={handleSexe}/>
                                <label htmlFor="female">Femelle</label>
                            </div>
                            <div>
                                <input type="radio" id="male" name="sexe" value="mâle" onChange={handleSexe}/>
                                <label htmlFor="male">Mâle</label>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <legend>Quel est l'âge de l'oiseau&nbsp;?</legend>
                            <div>
                                <input type="radio" id="jeune" name="age" value="jeune" onChange={handleAge}/>
                                <label htmlFor="jeune">Jeune</label>
                            </div>
                            <div>
                                <input type="radio" id="adulte" name="age" value="adulte" onChange={handleAge}/>
                                <label htmlFor="adulte">Adulte</label>
                            </div>
                        </fieldset>
                    </div>
                    {empty === true &&
                    <p className="errors">Tous les champs doivent être remplis</p>
                    }
                    <div>
                        <button className="btn">Enregistrer</button>
                    </div>
                </form>
            </section>

        </React.Fragment>
    )
};

export default NewCapture;
