import React, { Fragment} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/**
 *  This has been made to establish a Page Not Found route.
 * @param {*} props 
 * @returns 
 */

function Routes(props) {
  return (
      <Fragment>
        <Alert />
        <Routes>
            <Route exact path= '/' element = {<Landing />} />    
                <Route 
                exact path='register' 
                element = {<Register />} 
                />
                <Route 
                exact path='login' 
                element = {<Login />} 
                />
                <Route 
                exact path='profiles' 
                element = {<Profiles />} 
                />
                <Route 
                exact path='profile/:id' 
                element = {<Profile />} 
                />
                <Route 
                path='dashboard' 
                element= {<PrivateRoute component= {Dashboard}/>} 
                />
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
                <Route 
                path='create-profile' 
                element= {<PrivateRoute component= {ProfileForm}/>} 
                />
                <Route 
                path='edit-profile' 
                element= {<PrivateRoute component= {ProfileForm}/>} 
                />
                <Route 
                path='add-experience' 
                element= {<PrivateRoute component= {AddExperience}/>} 
                />
                <Route 
                path='add-education' 
                element= {<PrivateRoute component= {AddEducation}/>} 
                />
                <Route 
                path='posts' 
                element= {<PrivateRoute component= {Posts}/>} 
                />
                <Route 
                path='posts/:id' 
                element= {<PrivateRoute component= {Post}/>} 
                />
                <Route path="/*" component={<NotFound />} />
            </Routes>
      </Fragment>
    
  );
}

Routes.propTypes = {};

export default Routes;
