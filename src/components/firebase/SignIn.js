import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import firebase, { signIn, signOut, storage } from '../../firebase';

function SignIn({ auth, dispatch }) {
  const [newUser, setNewUser] = useState(false);
  useEffect(() => {
    return firebase
      .auth()
      .onAuthStateChanged((user) =>
        dispatch({ type: 'AUTH_USER', payload: user })
      );
  }, []);

  function verifyUser() {
    console.log('uid1', auth.user.uid);
    var docRef = firebase.firestore().collection('contacts').doc(auth.user.uid);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data());
        } else {
          // doc.data() will be undefined in this case
          firebase.firestore().collection('contacts').doc(auth.user.uid).set({
            firstname: 'dongus',
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
          <h1 newUser={newUser}>Welcome first timer </h1>
        ) : (
          <div>
            <img src={auth.user.photoURL} height="60" />
            <div className="p-4">
              {auth.user.displayName}
              {/* {console.log('auth', auth.user)} */}
            </div>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        )}
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
