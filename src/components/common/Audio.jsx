import React, { useEffect, useState } from 'react'
import firebase from '../../config/config.jsx'

export default function Audio(props) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        firebase.storage().ref('/encyclopedia/birds/' + props.audio).getDownloadURL().then((url) => {
            setUrl(url);
        })
    })
    return (
        <figure>
            <audio
                controls
                src={url}>
                Votre navigateur ne prend pas en charge l'élément
                <code>audio</code>.
            </audio>
        </figure>
    )
}