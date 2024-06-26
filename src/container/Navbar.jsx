import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import profile from "../media/profile.png";
import home from "../media/home.png";
import "./Navbar.css";

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navClass = isNavCollapsed ? "nav-menu collapsed" : "nav-menu show";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Prometheus.
        </a>
        <button
          onClick={handleNavCollapse}
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {user && (
          <div className={navClass} id="navbarNav">
            <button className="close-btn" onClick={handleNavCollapse}>
              X
            </button>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <img src={home} alt="Home" className="img" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <img src={profile} alt="Profile" className="img" />
                </a>
              </li>
              <li className="nav-item">
                <a className="logout-btn" href="/" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;