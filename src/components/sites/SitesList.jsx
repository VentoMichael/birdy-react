import React, {useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config';
import GMap from '../common/GoogleMap.jsx';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

const SiteList = (props) => {
    const [leState, setleState] = useState(null);
    const [long, setLong] = useState(null);
    const [lat, setLat] = useState(null);
    const [isLogged, setisLogged] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });
        } else {
            alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
        }

        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection('sites').get();
            setleState(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            setisLogged(true);
        } else {
            setisLogged(false);
        }
    });
    if (isLogged === false) {
        return <Redirect to='/'/>
    }
    if (leState === null) {
        return <Redirect to='/sites'/>
    }
    return (
        <React.Fragment>
            <section>
                <div>
                    <div className="list__catch_edit">
                        <h2>Sites de baguage</h2>
                        <Link className="link__back" to={'/sites/new'}>Nouveau site</Link>
                    </div>
                    <div className="container__login container__listes">
                        {leState.map(map => (
                            <div key={map.id}>
                                <p>Endroit du site : <span>{map.name}</span></p>
                                <p>Superficie : <span>{map.superficie} <abbr title="kilomètre">km</abbr></span></p>
                                <GMap initialPos={{lat: map.geopoint.latitude, lng: map.geopoint.longitude}} zoom={10}
                                      getCoordinates={true}/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
};
export default GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAP_API
})(SiteList);
