import React, {useState, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import { AuthContext } from '../../context/Auth.jsx';

const NewSite = () => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [superficie, setSuperficie] = useState('');
    const [empty, setEmpty] = useState(false);
    const [succes, setSucces] = useState(false);
    const {currentUser} = useContext(AuthContext);


    const handleLat = ({currentTarget: input}) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                input.value =  Math.round(position.coords.latitude*100)/100;
                setLatitude(position.coords.latitude)
            });
        } else {
            const lat = input.value;
            setLatitude(parseFloat(lat))
        }
    };
    const handleLong = ({currentTarget: input}) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                input.value = Math.round(position.coords.longitude*100)/100;
                setLongitude(position.coords.longitude)
            });
        } else {
            const long = input.value;
            setLatitude(parseFloat(long))
        }
    };

    const saveNewSite = (e) => {
        e.preventDefault();
        if (name === '' || longitude === '' || latitude === '' || superficie === ''){
            setEmpty(true)
        }
        else {
            console.log(new firebase.firestore.GeoPoint(latitude, longitude))
            firebase.firestore().collection('sites').add({
                name:name,
                geopoint: new firebase.firestore.GeoPoint(latitude, longitude),
                superficie:superficie,
                userUid:currentUser.uid,
            }).then(function() {
                setSucces(true);
            }).catch(function(error) {
                setSucces(false);
                console.error("Erreur d'ajout de document : ", error);
            });
        }
    };

    if(succes === true){
        return <Redirect to='/sites' />
    }
    return (
        <React.Fragment>
            <section>
                <h2>Créer un nouveau site</h2>
                {empty === true &&
                <p className="errors">Tous les champs doivent être rempli</p>
                }
                <form action="#" method="POST" className="container__login" onSubmit={saveNewSite}>
                    <div className="container__form_edition_bird">
                        <label htmlFor="name">Quel est le nom du site&nbsp;?</label>
                        <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" placeholder="Bruxelles"/>
                    </div>
                     <div className="container__form_edition_bird">
                        <label htmlFor="longitude">Quelle est la longitude&nbsp;?</label>
                        <input onChange={(e) => setLongitude(e.target.value)} type="number" step="0.01" id="longitude" name="longitude" placeholder="87.23"/>
                    </div>
                     <div className="container__form_edition_bird">
                        <label htmlFor="latitude">Quelle est la latitude&nbsp;?</label>
                        <input onChange={(e) => setLatitude(e.target.value)} type="number" step="0.01" id="latitude" name="latitude" placeholder="7.98"/>
                    </div>
                     <div className="container__form_edition_bird">
                        <label htmlFor="superficie">Quelle est la superficie&nbsp;? (en <abbr title="kilomètre">km</abbr>)</label>
                        <input onChange={(e) => setSuperficie(e.target.value)} type="number" id="superficie" name="superficie" placeholder="30"/>
                    </div>
                    <div>
                        <button className="btn">Enregistrer</button>
                    </div>
                </form>
            </section>
        </React.Fragment>
    )
};

export default NewSite;
