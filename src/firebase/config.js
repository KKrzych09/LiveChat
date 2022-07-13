import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCR3aNishYrJKhNQKxroqKRm7KsQESga2E",
    authDomain: "vue-firebase-sites-cf6cd.firebaseapp.com",
    projectId: "vue-firebase-sites-cf6cd",
    storageBucket: "vue-firebase-sites-cf6cd.appspot.com",
    messagingSenderId: "908253611293",
    appId: "1:908253611293:web:9551ee829f932fc8c28df4"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)

  const projectAuth = firebase.auth()
  const projectFirestore = firebase.firestore()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectAuth, projectFirestore, timestamp }