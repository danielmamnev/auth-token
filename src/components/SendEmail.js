import React, { useState } from 'react';
import { Accordion, Button, CloseButton, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { checkSignInStatus, initGmailClient } from '../gmail/Auth.jsx';
import { getValidEmails } from '../gmail/Utils';
import { sendMessage } from '../gmail/Send';

function SendEmail({ selected, auth, accessToken }) {
  const [show, setShow] = useState([{ modal: false, emailList: false }]);
  const [emailContent, setEmailContent] = useState({ subject: '', body: '' });
  function composeEmail() {
    // check if user has enabled gmail API
    // initGmailClient(accessToken);
    // window.gapi.client.setToken({ access_token: accessToken });

    setShow({ modal: true });
  }
  console.log('access token', accessToken);
  const onChange = (e) => {
    setEmailContent({ ...emailContent, [e.target.name]: e.target.value });
  };

  // sending the message
  function sendEmailHandler() {
    let x = selected.join(' ');
    const validTo = getValidEmails(x);
    console.log(validTo);
    const headers = {
      To: validTo.join(', '),
      Subject: emailContent.subject,
    };
    console.log(auth.user.email);
    const message =
      `From: ${auth.user.email}.\r\n` +
      `To: ${validTo}\r\n` +
      `Subject: ${emailContent.subject}\r\n\r\n` +
      `${emailContent.body}`;

    const encodedMessage = btoa(message);

    const reallyEncodedMessage = encodedMessage
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    console.log(
      'send - isSignedin?',
      window.gapi.auth2.getAuthInstance().isSignedIn.get()
    );

    window.gapi.client.gmail.users.messages
      .send({
        userId: 'me',
        resource: {
          raw: reallyEncodedMessage,
        },
      })
      .then(() => {
        console.log('email sent');
      });
  }

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
            <CloseButton onClick={() => setShow({ modal: false })}>
              X
            </CloseButton>
          </div>
          <div className="mt-auto mb-auto">Compose Email</div>
          <div className="justify-content-end">{button}</div>
          {show.emailList ? (
            <div
              style={{ width: '13rem', height: '80px' }}
              className="overflow-auto"
            >
              <table>
                {selected.map((s, i) => (
                  <tr key={i}>
                    <td>{s},</td>
                  </tr>
                ))}
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </Modal.Header>
        <Modal.Body>
          {selected.length > 0 ? (
            <Form>
              <Form.Group>
                <Form.Label>Subject Heading</Form.Label>
                <Form.Control name="subject" onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>E-mail Body</Form.Label>
                <Form.Control name="body" as="textarea" onChange={onChange} />
              </Form.Group>
              <Button onClick={sendEmailHandler}>Submit</Button>
            </Form>
          ) : (
            <div width="50px">
              Create and select contacts prior to composing a message
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selected: state.selected.selected,
  auth: state.auth,
  accessToken: state.access_token,
});

export default connect(mapStateToProps)(SendEmail);
