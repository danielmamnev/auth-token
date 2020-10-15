import React, { useState } from 'react';
import { Accordion, Button, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  signIn,
  initGmailClient,
  mountScripts,
  checkSignInStatus,
} from '../gmail/Auth.jsx';

function SendEmail({ selected }) {
  const [show, setShow] = useState([{ modal: false, emailList: false }]);
  function composeEmail() {
    // check if user has enabled gmail API
    checkSignInStatus();
    setShow({ modal: true });
  }
  console.log(show.emailList);

  let button;
  if (show.emailList) {
    button = (
      <Button onClick={() => setShow({ emailList: false, modal: true })}>
        Close
      </Button>
    );
  } else {
    button = (
      <Button onClick={() => setShow({ emailList: true, modal: true })}>
        List({selected.length})
      </Button>
    );
  }

  return (
    <div>
      <Button onClick={composeEmail}>Send an Email!</Button>
      <Modal show={show.modal}>
        <Modal.Header>
          <div className="float-left">
            <button onClick={() => setShow({ modal: false })}>X</button>
          </div>
          <div>Compose Email</div>
          {button}
          {show.emailList ? <div width="250px">boop</div> : <p></p>}
        </Modal.Header>
        <Modal.Body>
          {selected.length > 0 ? (
            <Form>
              <Form.Group>
                <Form.Label>Subject Heading</Form.Label>
                <Form.Control name="subject" />
              </Form.Group>
              <Form.Group>
                <Form.Label>E-mail Body</Form.Label>
                <Form.Control name="body" as="textarea" />
              </Form.Group>
            </Form>
          ) : (
            <div>Create and select contacts prior to composing a message</div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selected: state.selected.selected,
});

export default connect(mapStateToProps)(SendEmail);
