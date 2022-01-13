import api from '../utils/api';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';

import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
    
    if (localStorage.token){
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await api.get('/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }

}


// REGISTER USER
export const register = (formData) => async dispatch => {
    /* OLD CODE; REDUNDANT AFTER UTILS/API
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify({ name, email, password });
    */
    try{
        const res = await api.post('/users', formData);

        dispatch  ({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    }catch (error){

        const errs = error.response.data.errors;

        if (errs){
            errs.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch ({
            type: REGISTER_FAIL
        });
    }

}

// LOGIN USER
export const login = (email, password) => async dispatch => {
    // const body = { email, password };
    // OLD CODE; REDUNDANT AFTER UTILS/API
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });
    
    
    
    try{
        const res = await api.post('/auth', body);

        dispatch  ({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch (loadUser());
    }catch (error){

        const errs = error.response.data.errors;

        if (errs){
            errs.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch ({
            type: LOGIN_FAIL
        });
    }
};

// logout / Clear Profile data

export const logout = () => ({
    type: LOGOUT
});