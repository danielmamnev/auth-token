import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import SignIn from './firebase/SignIn';

export default function Header() {
  return (
    <div>
      <Navbar
        bg="light"
        variant="dark"
        className="d-flex justify-content-between"
      >
        <SignIn />
      </Navbar>
    </div>
  );
}
