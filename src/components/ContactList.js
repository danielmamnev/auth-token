import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

function ContactList({ auth, contacts }) {
  const [show, setShow] = useState(false);

  if (contacts == null) {
    return <div className="p-4">...Loading Contacts...</div>;
  } else {
    return (
      <div className="p-4">
        {contacts.map((contact, i) => (
          <Card key={i}>
            <Card.Header>
              {contact.firstname} {contact.lastname}
            </Card.Header>
            <Card.Body>{contact.phone}</Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  contacts: state.data.contacts,
});

export default connect(mapStateToProps)(ContactList);
