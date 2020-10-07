import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import firebase, { signIn, signOut } from '../firebase';
import { connect } from 'react-redux';

function Home({ auth, dispatch }) {
  useEffect(() => {
    return firebase
      .auth()
      .onAuthStateChanged((user) =>
        dispatch({ type: 'AUTH_USER', payload: user })
      );
  }, []);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };
  if (auth.user) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="m-4">Contact List</p>
          </div>
          <div className="col-md-6 text-center">
            <Button className="m-4" variant="primary" onClick={showModal}>
              New Contact
            </Button>
            <Modal show={show}>
              <Modal.Header closeButton>
                <Modal.Title>New Customer</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>Modal body text goes here.</p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
                <Button variant="primary">Save changes</Button>
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
