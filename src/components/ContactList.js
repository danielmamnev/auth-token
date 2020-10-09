import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';

function ContactList({ auth }) {
  const [contacts, setContacts] = useState([]);
  var db = firebase.firestore();

  useEffect(() => {
    db.collection(`users/${auth.user.uid}/contacts`)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((d) => d.data());
        setContacts(data);
      });
  }, []);
  return (
    <>
      {contacts.map((contact, i) => (
        <div key={i}>{contact.firstname}</div>
      ))}
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ContactList);
