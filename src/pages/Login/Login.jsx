import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import swal from 'sweetalert';
import {Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      swal("Login successfully", "", "success");
      // Redirect or show a success message
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        swal("Error", "Incorrect password", "error");
      } else {
        console.error("Login error:", error);
        swal("Error", "An error occurred during login", "error");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="card signup-card">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Login</h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center" style={{flexDirection:'column'}}>
              <span style={{ color: 'blue', cursor: 'pointer' }}>
                <Link to="/signin" className="linko">Dont't have an account?</Link>
              </span>
              
              <button type="submit" className="btn btn-dark btn-block" style={{marginTop: '20px'}}>
              Login
            </button>
            </div>

            
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
