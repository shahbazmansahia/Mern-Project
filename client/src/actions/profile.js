import axios from 'axios';
import { setAlert } from './alert';
import api from '../utils/api';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types';

// importing due to use of webhooks and react router v6
import { Navigate } from 'react-router-dom';
// Get curr user's profile
export const getCurrProfile = () => async (dispatch) => {
    try{
        //const res = await axios.get('./api/profile/me');

        const res = await api.get('./api/profile/me');
        
        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch (error){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

/**
 * 
 *  Create and/or Update a profile
 *  history: object value passed to implement redirect 
 *  edit: to keep track of whether we're creating or updating/editiing a current profile 
 *  NOTE: Changes have been made due to usage of react router v6; withRouter has been deprecated and history is therefore passed with useNavigate
 */
export const createProfileAct = (formData, Navigate, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile/me', formData, config);

        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch (setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        // since this is an action, we can't just use <Navigate to= xx> and call it a day!
        // NOTE: replacing history.push() with navigate() due to use of React Router 6 and deprecation of history and withRouter 
        if(!edit){
            Navigate('/dashboard');
        }
    } catch (error) {
        // for printing out the list of errors that might be triggered
        const errors = error.response.data.errors;

        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// Add Experience
// 'history' replaced with 'navigate' to conform with router v6 protocol
export const addExperience = (formData, Navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch ({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch (setAlert('Experience Added successfully!', 'success'));

        // since this is an action, we can't just use <Navigate to= xx> and call it a day!
        // NOTE: replacing history.push() with navigate() due to use of React Router 6 and deprecation of history and withRouter 
        Navigate('/dashboard');

    } catch (error) {
        // for printing out the list of errors that might be triggered
        const errors = error.response.data.errors;

        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};


// Add Education
// 'history' replaced with 'navigate' to conform with router v6 protocol
export const addEducation = (formData, Navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch ({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch (setAlert('Education Added successfully!', 'success'));

        // since this is an action, we can't just use <Navigate to= xx> and call it a day!
        // NOTE: replacing history.push() with navigate() due to use of React Router 6 and deprecation of history and withRouter 
        Navigate('/dashboard');

    } catch (error) {
        // for printing out the list of errors that might be triggered
        const errors = error.response.data.errors;

        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

// Delete experience
export const delExperience = id => async dispatch => {
    if (window.confirm('Are you Sure?')){
        try {
            const res = await axios.delete(`/api/profile/experience/${id}`);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
    
            // trigger alert upon deletion
            dispatch (setAlert('Experience Removed', 'success'));
    
        } catch (error) {
            
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            });
        }
    }
};


// Delete education
export const delEducation = id => async dispatch => {
    if (window.confirm('Are you Sure?')){
        try {
            const res = await axios.delete(`/api/profile/education/${id}`);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
    
            // trigger alert upon deletion
            dispatch (setAlert('Education Removed', 'success'));
    
        } catch (error) {
            
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            });
        }
    }
};

// Delete Account and profile
export const delAccount = id => async dispatch => {
    if (window.confirm('Are you Sure? This data will not be recoverable upon deletion!')){
        try {
            const res = await axios.delete(`/api/profile/`);
            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch({
                type: ACCOUNT_DELETED
            });
            // trigger alert upon deletion
            dispatch (setAlert('Account deleted successfully. forever. yes. forever forever. We did keep a backup of any of your stuff.', 'success'));

        } catch (error) {
            
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            });
        }
    }
    
};
