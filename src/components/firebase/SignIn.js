import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import firebase, { signIn, signOut } from '../../firebase';
import { checkSignInStatus } from '../../gmail/Auth';

function SignIn({ auth, dispatch }) {
  const [newUser, setNewUser] = useState(false);
  useEffect(() => {
    return firebase
      .auth()
      .onAuthStateChanged((user) =>
        dispatch({ type: 'AUTH_USER', payload: user })
      );
  }, []);

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
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      </>
    );
  } else {
    return <Button onClick={signIn}>Sign In</Button>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SignIn);
