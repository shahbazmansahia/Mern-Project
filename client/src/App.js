import React, { Fragment } from 'react';
// Changed Switch to Routes due to incompatibility with the latest version of React
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// Redux libs./files

import { Provider } from 'react-redux';
// store Provider
import store from './store';

import Alert from './components/layout/Alert';

/* The <Landing /> tag was changed from 'Landing', component was changed to element due to compatibility issues with the latest version of React*/
/* <Provider> wrap for redux store provider */        
const App = () => (
  
  <Provider store= {store}>
    <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route exact path= '/' element = {<Landing />} />
      </Routes>
        <section className = "container">
          <Alert />
          <Routes>
            <Route exact path='/register' element = {<Register />} />
            <Route exact path='/login' element = {<Login />} />
          </Routes>
        
        </section>
           
    </Fragment>
  
  </Router>
  </Provider>
  );

export default App;
