import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import '../style.css';

function ContactList({ auth, contacts, dispatch }) {
  const [show, setShow] = useState({});
  const [edit, setEdit] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    profession: '',
  });
  const [selected, setSelected] = useState([]);

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

  const showDeleteModal = (c) => {
    setShow({ ...show, [c]: true });
  };

  const onChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  function updateContact(docId) {
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
  function deleteContact(docId) {
    firebase
      .firestore()
      .collection('users')
      .doc(auth.user.uid)
      .collection('contacts')
      .doc(docId)
      .delete()
      .then(function () {
        console.log('Contact succesfully deleted!');
      });

    firebase
      .firestore()
      .collection(`users/${auth.user.uid}/contacts`)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((d) => d.data());
        dispatch({ type: 'LOAD_CONTACTS', payload: data });
      });
    setShow(false);
  }
  function addSelected(value, email) {
    if (value === true) {
      setSelected([...selected, email]);
      // console.log('selected!', selected);
    } else {
      let emailIndex = selected.indexOf(email);
      let selectedArray = selected;
      let deleted = selectedArray.splice(emailIndex, 1);
      setSelected(selectedArray);
      console.log('removed!', selected);
    }
  }
  useEffect(() => {
    dispatch({ type: 'LOAD_SELECTED', payload: selected });
  }, [selected]);

  if (contacts == null) {
    return <div className="p-4">...Loading Contacts...</div>;
  } else {
    return (
      <div className="p-4">
        Contacts ({contacts.length})
        {contacts.map((contact, i) => (
          <div key={i}>
            <Card>
              <Card.Header>
                <div className="float-left">
                  <input
                    type="checkbox"
                    name="check"
                    onChange={(e) =>
                      addSelected(e.target.checked, contact.email)
                    }
                    className="p-1"
                  />
                </div>
                <div className="justify-content-between">
                  <span className="pl-3">
                    {contact.firstname} {contact.lastname}
                  </span>
                  {contact.imageURL !== 'none' ? (
                    <div className="float-right pr-2">
                      <img
                        src={contact.imageURL}
                        alt={contact.firstname}
                        className="rounded-image"
                      />
                    </div>
                  ) : (
                    <div className="float-right pr-2">
                      <h4 className="contact-icon">{contact.firstname[0]}</h4>
                    </div>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                <div>{contact.profession}</div>
                <div>
                  <Button
                    className="float-right"
                    onClick={() => showContactModal(contact.id, contact)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="float-right"
                    onClick={() => showDeleteModal('delete' + contact.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
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
                  <Form.Group controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastname"
                      onChange={onChange}
                      defaultValue={contact.lastname}
                    />
                  </Form.Group>
                  <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      name="phone"
                      onChange={onChange}
                      defaultValue={contact.phone}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      onChange={onChange}
                      defaultValue={contact.email}
                    />
                  </Form.Group>
                  <Form.Group controlId="profession">
                    <Form.Label>Industry/Profession</Form.Label>
                    <Form.Control
                      name="profession"
                      onChange={onChange}
                      defaultValue={contact.profession}
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
                    updateContact(contact.id);
                  }}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={show['delete' + contact.id]}>
              <Modal.Header>
                Delete contact {contact.firstname} {contact.lastname}?
              </Modal.Header>
              <Modal.Body>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Go Back
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteContact(contact.id)}
                >
                  Delete
                </Button>
              </Modal.Body>
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
