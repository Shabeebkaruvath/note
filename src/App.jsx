import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import Signin from './pages/Signin/Signin';
import Login from './pages/Login/Login';
import Navbar from './container/Navbar';
import Footer from './container/Footer';
import Home from './pages/Home/Home';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  

  return (
    <div className="container">
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-md-8">
          {user ? (
            <Home />
          ) : (
            <>
              <Signin />
              <Login />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;