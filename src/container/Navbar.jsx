import React, { useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import profile from "../media/profile.png";
import home from "../media/home.png";

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
      // Optionally, you can redirect the user or perform additional actions after successful logout
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error
    }
  };

  const classOne = isNavCollapsed
    ? "navbar-collapse collapse"
    : "navbar-collapse collapse show";
  const classTwo = isNavCollapsed
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Prometheus.
        </a>
        <button
          onClick={handleNavCollapse}
          className={`${classTwo}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {user && (
          <>
            <div className={`${classOne}`} id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <img src={home} alt="" className="img" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <img src={profile} alt="" className="img" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="logout-btn" href="/" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
