import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';

function ContactList({ auth }) {
  console.log('Contact list', firebase.firestore().collection(auth.user.uid));
  return <div></div>;
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ContactList);
