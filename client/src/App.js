import React, { Fragment } from 'react';
// Changed Switch to Routes due to incompatibility with the latest version of React
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/layout/auth/Register';
import Login from './components/layout/auth/Login';


/* The <Landing /> tag was changed from 'Landing', component was changed to element due to compatibility issues with the latest version of React*/
        
const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route exact path= '/' element = {<Landing />} />
      </Routes>
        <section className = "container">
          <Routes>
            <Route exact path='/register' element = {<Register />} />
            <Route exact path='/login' element = {<Login />} />
          </Routes>
        
        </section>
           
    </Fragment>
  
  </Router>
  );

export default App;
