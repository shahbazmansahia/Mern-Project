// to combine all reducers
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth'

// to define which reducers to combine and pass/export
export default combineReducers({
    alert,
    auth
});