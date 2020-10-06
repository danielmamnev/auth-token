import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import firebase, { signIn, signOut } from '../../firebase';
import { AUTH_USER } from '../../redux/types';

function SignIn({ auth, dispatch }) {
  useEffect(() => {
    return firebase
      .auth()
      .onAuthStateChanged((user) =>
        dispatch({ type: AUTH_USER, payload: user })
      );
  }, []);
  if (auth.user) {
    return (
      <>
        <div>{auth.user.displayName}</div>
        <Button onClick={signOut}>Sign Out</Button>
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
