import React, { useState, useEffect } from 'react';
//import firebase from './firebase'
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from 'react-bootstrap/Button';

function Auth() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    console.log('firebase mounted: ', firebase.auth());
  }, []);

  const uiConfig = {
    signInSuccessUrl: '/dashboard',
    // signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  console.log(firebase.auth().currentUser);
  return (
    <div className="container">
      {isSignedIn ? (
        <div>
          <Button
            variant="primary"
            className="signout"
            onClick={() => firebase.auth().signOut()}
          >
            Sign Out
          </Button>
          <div className="photo">
            <img
              style={{ height: '100px' }}
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          </div>
        </div>
      ) : (
        <div className="authcontainer">
          <h1>Please Sign in with the following:</h1>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )}
    </div>
  );
}

export default Auth;
