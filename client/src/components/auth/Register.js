import React, { Fragment, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';


// for alert action implementation via react redux
import { connect } from 'react-redux';

import { register } from '../../actions/auth';


export const Register = ( { setAlert, register, isAuthenticated } ) => {
    
    // formData: Object which contains all the form Data
    // setFormData: function for updating state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    
    // Destructure and pull out form values
    const { name, email, password, password2 } = formData;
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value  });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2){
            setAlert('Passwords do not match', 'danger');
        }
        else{
            // we have access to name, email and password from the submitted formData attrib stated above
            register ({ name, email, password });
            console.log("Success!");
        }
    };

    // NOTE: REDIRECT HAS BEEN REPLACED BY NAVIGATE IN UPDATED REACT!!
    // Redirect if login session active
    
    if (isAuthenticated){
        return <Navigate to= "/dashboard" />;
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Create Your Account
                </p>
                <form className="form" onSubmit = {onSubmit} >
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            name="name" 
                            value= { name } 
                            onChange= {onChange}
                                
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email" 
                            value= { email } 
                            onChange= { onChange }
                            
                        />
                        <small className="form-text">
                            This site uses Gravatar so if you want a profile image, use a
                            Gravatar email
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            
                            value= { password } 
                            onChange= { onChange }
                            
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            
                            value= { password2 } 
                            onChange= { onChange }
                            
                            
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/Login">Sign In</Link>
                </p>
        </section>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStatetoProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStatetoProps, { setAlert, register }) (Register);