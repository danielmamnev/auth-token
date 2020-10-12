import firebase from 'firebase';
import 'firebase/storage';

export const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATA_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

firebase.initializeApp(config);

export function signIn() {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
}
export function signOut() {
  firebase.auth().signOut();
}
var storage = firebase.storage();

export default firebase;
