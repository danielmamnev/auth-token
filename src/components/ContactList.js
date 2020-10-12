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
    id: 'balls',
  });

  const showContactModal = (c) => {
    setShow({ ...show, [c]: true });
  };

  const onChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  console.log('editid', edit.id);
  function updateCustomer() {
    // firebase
    //   .firestore()
    //   .collection(`users/${auth.user.uid}/contacts/${edit.id}`)
    //   .set({
    //     firstname: edit.firstname,
    //     lastname: edit.lastname,
    //     phone: edit.phone,
    //     email: edit.email,
    //     profession: edit.profession,
    //   });
  }

  if (contacts == null) {
    return <div className="p-4">...Loading Contacts...</div>;
  } else {
    console.log('contacts', contacts);
    return (
      <div className="p-4">
        {contacts.map((contact, i) => (
          <div>
            <Card key={i}>
              <Card.Header>
                {contact.firstname} {contact.lastname}
                <Button
                  className="float-right"
                  onClick={() => showContactModal(contact.id)}
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
                      placeholder={contact.firstname}
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
                  <input
                    name="id"
                    value={contact.id}
                    onChange={onChange}
                    hidden
                  />
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
                    updateCustomer();
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
