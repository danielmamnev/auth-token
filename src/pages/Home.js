import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import firebase from '../firebase';
import { connect } from 'react-redux';
import ContactList from '../components/ContactList';

function Home({ auth, dispatch }) {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contact, setContact] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    profession: '',
    owner: '',
  });
  useEffect(() => {
    return firebase
      .auth()
      .onAuthStateChanged((user) =>
        dispatch({ type: 'AUTH_USER', payload: user })
      );
  }, []);

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const createContact = () => {
    const ref = firebase
      .firestore()
      .collection('users')
      .doc(auth.user.uid)
      .collection('contacts')
      .doc();
    console.log('ref.id', ref.id);

    ref
      .set({
        firstname: contact.firstname,
        lastname: contact.lastname,
        phone: contact.phone,
        email: contact.email,
        profession: contact.profession,
        owner: contact.owner,
        id: ref.id,
      })
      .then(() => {
        console.log('Contact Succesfully Created', ref.id);
      })
      .then(setSuccess(true));
    // var db_contact = firebase.firestore().collection('users').doc(auth.user.uid).collection('contacts').where("firstname", "==", contact.firstname)
    setContact({
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      profession: '',
    });
  };

  if (auth.user) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <ContactList />
          </div>
          <div className="col-sm-6 text-center">
            <Button
              className="m-4"
              variant="primary"
              onClick={() => {
                setShow(true);
                setContact({
                  owner: auth.user.uid,
                });
              }}
            >
              New Contact
            </Button>
            <Modal show={show}>
              <Modal.Header closeButton>
                <Modal.Title>New Contact</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  <Form.Group controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstname"
                      onChange={onChange}
                      value={contact.firstname}
                    />
                  </Form.Group>
                  <Form.Group controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastname"
                      onChange={onChange}
                      value={contact.lastname}
                    />
                  </Form.Group>
                  <Form.Group controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      name="phone"
                      onChange={onChange}
                      value={contact.phone}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      name="email"
                      onChange={onChange}
                      value={contact.email}
                    />
                  </Form.Group>
                  <Form.Group controlId="profession">
                    <Form.Label>Profession/Industry</Form.Label>
                    <Form.Control
                      name="profession"
                      onChange={onChange}
                      value={contact.profession}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                {success ? <p>Customer Created!</p> : <p></p>}
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={createContact}>
                  Save changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center">
        <p className="m-4">Please sign in</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
