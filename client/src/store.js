import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = {thunk};
// '...middleware' is a spread operator with the middleware variable/attribute
const store = createStore(rootReducer, initialState, composeWithDevTools (applyMiddleware(...middleware)));

export default store;