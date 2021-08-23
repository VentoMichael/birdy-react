import React, { useEffect, useState } from 'react'
import firebase from '../../config/config.jsx'

export default function Image(props) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        firebase.storage().ref(props.img).getDownloadURL().then((url) => {
            setUrl(url);
        })
    })

    return (
        <img className="bird__image" src={url} width={props.width} height={props.height} alt={props.alt} />
    )
}