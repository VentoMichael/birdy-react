import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDNSExC65NXG_xHTvDbDOYrToXesFOfgak",
    authDomain: "birdy-83c2f.firebaseapp.com",
    databaseURL: "https://birdy-83c2f-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "birdy-83c2f",
    storageBucket: "birdy-83c2f.appspot.com",
    messagingSenderId: "69656064162",
    appId: "1:69656064162:web:18d00ba7da0520f75b27fb",
    measurementId: "G-LEJMY8XBN0"
};

firebase.initializeApp(config);

export default firebase;
