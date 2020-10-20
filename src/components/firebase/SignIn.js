import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import firebase, { signOut } from '../../firebase';
import { checkSignInStatus } from '../../gmail/Auth';

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://mail.google.com/');

const fbAuth = firebase.auth();

function SignIn({ auth, dispatch, accessToken }) {
  const [newUser, setNewUser] = useState(false);
  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_USER', payload: user });
    });
  }, []);

  function signIn() {
    let at;
    firebase
      .auth()
      .setPersistence('none')
      .then(function () {
        fbAuth
          .signInWithPopup(provider)
          .then((result) => {
            at = result.credential.accessToken;
            dispatch({
              type: 'ACC_TOK',
              payload: result.credential.accessToken,
            });
            // console.log('this is popup result', result.credential.accessToken);
          })
          .then(() => {
            window.gapi.client
              .init({
                apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
                clientId: process.env.REACT_APP_GMAIL_FIREBASE_CLIENT_ID,
                discoveryDocs: [
                  'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
                ],
                scope: 'https://mail.google.com/',
              })
              .then(function () {
                const GoogleAuth = window.gapi.auth2.getAuthInstance();
                if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
                  GoogleAuth.signIn();
                }
                // Listen for sign-in state changes.
              });
          });
      });
  }

  var db = firebase.firestore();

  function verifyUser() {
    db.collection(`users/${auth.user.uid}/contacts`)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((d) => d.data());
        dispatch({ type: 'LOAD_CONTACTS', payload: data });
      });
    var docRef = firebase.firestore().collection('users').doc(auth.user.uid);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
        } else {
          firebase.firestore().collection('users').doc(auth.user.uid).set({
            firstname: auth.user.displayName,
          });
          setNewUser(true);
          console.log('Welcome First Timer!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }

  function signOutHandler() {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      GoogleAuth.signOut();
    }
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    signOut();
  }

  if (auth.user) {
    verifyUser();

    return (
      <>
        {newUser ? (
          <h3 newUser={newUser} className="pr-4">
            Congratulations on joining Auth-Token!
          </h3>
        ) : (
          ''
        )}
        <div className="d-flex mt-auto mb-auto">
          <img alt="profile" src={auth.user.photoURL} height="30" />
          <p className="pl-2 pr-2">{auth.user.displayName}</p>
          <Button onClick={signOutHandler}>Sign Out</Button>
        </div>
      </>
    );
  } else {
    return <Button onClick={signIn}>Sign In</Button>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  accessToken: state.access_token,
});

export default connect(mapStateToProps)(SignIn);
