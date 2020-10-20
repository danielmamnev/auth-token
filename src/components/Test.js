import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import firebase from '../firebase';

export default function Test() {
  const [accessTok, setAccessTok] = useState();

  function getAuthToken() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://mail.google.com');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setAccessTok(result.credential.accessToken);
        console.log('this is popup result', result);
      });
  }

  function testStuff() {
    console.log(
      'window.gapi',
      window.gapi.auth2.getAuthInstance().isSignedIn.get()
    );
  }
  async function sendTheEmailAlready() {
    const firebaseAPI = 'AIzaSyAu0aR8z8pLvjGZqi3GEyWox76Yc13EgW4';
    const recipient = 'daniksk9@gmail.com';
    const subject = 'Blah test';
    // const encodedToken = encodeURIComponent(accessTok);
    // var xhr = new XMLHttpRequest();
    // xhr.open(
    //   'POST',
    //   `https://gmail.googleapis.com/upload/gmail/v1/users/me/messages/send?access_token=${encodedToken}`
    // );
    // xhr.setRequestHeader('Content-Type', 'text/plain');
    // xhr.send();

    fetch(
      `https://content-gmail.googleapis.com/gmail/v1/users/me/messages/send?key=${firebaseAPI}`,
      {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + accessTok,
          'Content-Type': 'message/rfc822',
          'sec-fetch-mode': 'cors',
          accept: '*/*',
        },
        body: `To: ${recipient}
    Subject: ${subject}

    body line1
    line2`,
      }
    ).then(function (data) {
      console.log(data);
    });
  }
  return (
    <div>
      <Button onClick={getAuthToken}>get access token</Button>
      <Button onClick={sendTheEmailAlready}>Send email</Button>
      <Button variant="danger" onClick={testStuff}>
        TEST
      </Button>
    </div>
  );
}
