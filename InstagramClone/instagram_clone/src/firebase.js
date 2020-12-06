

import firebase from "firebase";
const firebaseApp = firebase.initializeApp({

        apiKey: "AIzaSyCsxUXNqVqr8Mm9dPR4LMeZxhYqFEZwkRQ",
        authDomain: "instagram-clone-89130.firebaseapp.com",
        databaseURL: "https://instagram-clone-89130.firebaseio.com",
        projectId: "instagram-clone-89130",
        storageBucket: "instagram-clone-89130.appspot.com",
        messagingSenderId: "556576260283",
        appId: "1:556576260283:web:8cad378b35d6637e62a99e",
        measurementId: "G-2WCRRRR6GN"    
});

//snippet
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();



  export {db, auth, storage};