import React from 'react';
import './Navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase'; // Assuming you have exported the auth instance from your firebase.js file

function Navbar() {
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally, you can redirect the user or perform additional actions after successful logout
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Prometheus.</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Contact</a>
            </li>
            <li className="nav-item">
  <a className="nav-link" href="/" onClick={handleLogout}>
    Logout
  </a>
</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
