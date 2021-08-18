import React, {useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config';
import GMap from '../common/GoogleMap.jsx';
import {GoogleApiWrapper} from 'google-maps-react';

const SiteList = (props) => {
    const [leState, setleState] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection('sites').get();
            setleState(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);
    if (leState === null) {
        return <Redirect to='/sites'/>
    }
    return (
        <React.Fragment>
            <section>
                <div>
                    <div className="list__catch_edit">
                        <h2>Sites de baguage</h2>
                        <Link className="btn__link__back" to={'/sites/new'}><span>Nouveau site</span></Link>
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
    apiKey: "AIzaSyBLbc_IMKUfMTdokXqOWLMCXErOUJTwhX4"
})(SiteList);
