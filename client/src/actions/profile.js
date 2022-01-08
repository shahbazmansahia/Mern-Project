import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

// importing due to use of webhooks and react router v6
import { Navigate } from 'react-router-dom';
// Get curr user's profile
export const getCurrProfile = () => async dispatch => {
    try{
        const res = await axios.get('./api/profile/me');

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
}

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

        const res = await axios.post('/api/profile', formData, config);

        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch (setAlert(edit ? 'Profile Updated' : 'Profile Created'));

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
}