import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [{ }];

export default function (state = initialState, action) {
    // destructuring....
    const { type, payload } = action;
        
    switch (type) {
        
        case SET_ALERT:
            // action.payload has a 'msg', 'id' and 'alertType' attribute
            return [...state, payload];
        
        case REMOVE_ALERT:
            // we use the *.filter() method because we want to eliminate only 1 alert
            // this simply filters out the particular payload triggered to complete the timeout process for alerts
            return state.filter(alert => alert.id !== payload);

        default:
            return state;
    
    }
}