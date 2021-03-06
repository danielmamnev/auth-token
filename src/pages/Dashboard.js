import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import firebase from 'firebase';
export default function Dashboard() {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };
  return (
    <div>
      {console.log(firebase.auth().currentUser.displayName)}
      <Button variant="primary" onClick={showModal}>
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
  );
}
