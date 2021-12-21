// using uuid for easy random no. generation
//import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './types';

// NOTE: dispatch enabled due to thunk middleware
export const setAlert = (msg, alertType, timeOutVal = 5000) => dispatch => {
    const id = uuidv4();
    dispatch ({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    // implementing alert timeout

    setTimeout(() => dispatch ({ type: REMOVE_ALERT, payload: id }), timeOutVal);
}