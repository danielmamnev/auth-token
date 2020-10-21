import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import firebase, { signIn } from '../firebase';
import { connect } from 'react-redux';
import ContactList from '../components/ContactList';
import 'firebase/storage';
import SendEmail from '../components/SendEmail';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrow } from '@fortawesome/free-solid-svg-icons';
// GMAIL API SCRIPT

function Home({ auth, dispatch, accessToken }) {
  const [image, setImage] = useState();
  const [noFile, setNoFile] = useState(true);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contact, setContact] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    profession: '',
    owner: '',
    imageURL: '',
  });

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_USER', payload: user });
    });
  }, []);

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const createContact = () => {
    if (image) {
      firebase
        .storage()
        .ref(`images/${image.name}`)
        .getDownloadURL()
        .then(function (url) {
          console.log('url is: ', url);

          setContact({ imageURL: url });

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
              imageURL: url,
            })
            .then(() => {
              console.log('Contact Succesfully Created', ref.id);
            })
            .then(setSuccess(true));
        });
    } else {
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
          imageURL: 'none',
        })
        .then(() => {
          console.log('Contact Succesfully Created', ref.id);
        })
        .then(setSuccess(true));
    }

    firebase
      .firestore()
      .collection(`users/${auth.user.uid}/contacts`)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((d) => d.data());
        dispatch({ type: 'LOAD_CONTACTS', payload: data });
      });

    setContact({
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      profession: '',
      owner: '',
      imageURL: '',
    });
  };

  const handleLoad = (e) => {
    if (!image) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
      firebase
        .storage()
        .ref(`images/${e.target.files[0].name}`)
        .put(e.target.files[0])
        .then(function (snapshot) {
          console.log('Uploaded!');
        });
    } else {
      // if an image has already been chosen, and user is cancelling choosing an image
      setImage(undefined);
    }
  };
  if (auth.user) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <ContactList />
          </div>
          <div className="col-sm-6 text-center">
            <div className="p-4 d-inline-flex">
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

              <SendEmail />
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
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
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastname"
                      onChange={onChange}
                      value={contact.lastname}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      name="phone"
                      onChange={onChange}
                      value={contact.phone}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      name="email"
                      onChange={onChange}
                      value={contact.email}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="profession">
                    <Form.Label>Profession/Industry</Form.Label>
                    <Form.Control
                      name="profession"
                      onChange={onChange}
                      value={contact.profession}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="profession">
                    <Form.Label>Contact Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="imageURL"
                      onChange={handleLoad}
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
                <Button type="submit" variant="primary" onClick={createContact}>
                  Create Contact
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
        <h1 className="main-header">Welcome to Auth-Token</h1>
        {/* <h2>Your Rolodex is now on steroids</h2> */}
        <h3>Sign in to begin</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  accessToken: state.access_token,
});

export default connect(mapStateToProps)(Home);
