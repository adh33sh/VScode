

  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyDQ63SiZmSX_0WL8vIzDBQPmKPyJSM3-U4",
        authDomain: "todo-app-6e29c.firebaseapp.com",
        databaseURL: "https://todo-app-6e29c.firebaseio.com",
        projectId: "todo-app-6e29c",
        storageBucket: "todo-app-6e29c.appspot.com",
        messagingSenderId: "88334888315",
        appId: "1:88334888315:web:1b4ed138c55966b4d721de",
        measurementId: "G-H8QJWRFSLK"
  });
  const db = firebaseApp.firestore();
  export default db;