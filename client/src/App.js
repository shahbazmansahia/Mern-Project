import React, { Fragment, useEffect } from 'react';
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

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import Dashboard from './components/dashboard/Dashboard';
// FIX ME: PrivateRoute usage like this has been depricated in newer react/JS libraries
import PrivateRoute from './components/routing/PrivateRoute';

// outdated; replaced with ProfileForm
//import CreateProfile from './components/profile-forms/CreateProfile';

// replacement for CreateProfile
import ProfileForm from './components/profile-forms/ProfileForm';


if (localStorage.token){
  setAuthToken(localStorage.token);
}

/* The <Landing /> tag was changed from 'Landing', component was changed to element due to compatibility issues with the latest version of React*/
/* <Provider> wrap for redux store provider */        
const App = () => {

  // Study webhooks for more!
  // whenever state updates, this will keep on running in a loop unless we pass the second (empty) value; making it run once per state change
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // FIXME: PRIVATEROUTE NOT WORKING. IT DOES WORK AS NORMAL ROUTE THOUGH!
  //        Partially fixed with the help of : https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
  return(
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
            <Route path='dashboard' element= {<Dashboard />} />
            {// omitted for testing
             //<Route path='dashboard' element= {<PrivateRoute component= {Dashboard} />} />            
            }
            {
              /* NOTE: GET RID OF CURLY BRACES AND INSERT THIS INSTEAD OF THE DASHBOARD ROUTE FOR INITIAL 
                       RESULTS/APPROACH. PUTTING THIS HERE TO UNDERSTAND IT LATER
              <Route path='/dashboard' element= {
              <PrivateRoute exact path='/dashboard' element = {<Dashboard />} />
            } />*/
            }
            {/* NOTE: THE FOLLOWING IS ALSO SUPPOSED TO BE A PRIVATE ROUTE
                <Route path='/create-profile' element= {
                <PrivateRoute exact path='/create-profile' element = {<CreateProfile />} />
            } />
            */}
            <Route path='/create-profile' element= {<ProfileForm />} />
          </Routes>
        
        </section>
           
    </Fragment>
  
  </Router>
  </Provider>
  );
};
export default App;
