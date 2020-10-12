import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { connect, shallowEqual } from 'react-redux';
import { Button, Card, Modal, Form } from 'react-bootstrap';

function ContactList({ auth, contacts }) {
  const [show, setShow] = useState({});
  const [edit, setEdit] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    profession: '',
  });

  const showContactModal = (c, data) => {
    setEdit({
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
      profession: data.profession,
    });
    console.log('data', data);
    setShow({ ...show, [c]: true });
  };

  const onChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  function updateCustomer(docId) {
    console.log('docId', docId);

    firebase
      .firestore()
      .collection('users')
      .doc(auth.user.uid)
      .collection('contacts')
      .doc(docId)
      .set({
        firstname: edit.firstname,
        lastname: edit.lastname,
        phone: edit.phone,
        email: edit.email,
        profession: edit.profession,
        id: docId,
      })
      .then(function () {
        console.log('Contact successfully updated!');
      });
  }

  if (contacts == null) {
    return <div className="p-4">...Loading Contacts...</div>;
  } else {
    return (
      <div className="p-4">
        {contacts.map((contact, i) => (
          <div key={i}>
            <Card>
              <Card.Header>
                {contact.firstname} {contact.lastname}
                <Button
                  className="float-right"
                  onClick={() => showContactModal(contact.id, contact)}
                >
                  Edit
                </Button>
              </Card.Header>
              <Card.Body>{contact.phone}</Card.Body>

              {contact.firstname}
            </Card>
            <Modal show={show[contact.id]}>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstname"
                      onChange={onChange}
                      defaultValue={contact.firstname}
                    />
                  </Form.Group>
                  <Form.Group controlId="firstname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastname"
                      onChange={onChange}
                      defaultValue={contact.lastname}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    updateCustomer(contact.id);
                  }}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
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
