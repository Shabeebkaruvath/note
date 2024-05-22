import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import Signin from './pages/Signin/Signin';
import Login from './pages/Login/Login';
import Navbar from './container/Navbar';
import Footer from './container/Footer';
import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div >
          <Navbar />
          <div className="row justify-content-center">
         
              {!user && (
                <>
                  <Login/>
                </>
              )}
              {
                user && (
                  <>
                    <Home />
                  </>
                )
              }
             
          </div>
          <Footer />
        </div>
      ),
    },
    {
      path: '/signin',
      element: (
        <div className="container">
          <Navbar />
          <div className="row justify-content-center">
            <div className="col-md-8">{user ? <Home /> : <Signin />}</div>
          </div>
          <Footer />
        </div>
      ),
    },
    {
      path: '/login',
      element: (
        <div className="container">
          <Navbar />
          <div className="row justify-content-center">
            <div className="col-md-8">{user ? <Home /> : <Login />}</div>
          </div>
          <Footer />
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;