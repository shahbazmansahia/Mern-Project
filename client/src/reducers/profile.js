import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from '../actions/types';
/*
    profile: gets all of *our* profile data and when needed, gets the other user's profile (the one we might visit)
    profiles: gets a list of all profiles for the profile listing page
    repos: fetches the github repos
    loading: used for auth
    error: for logging errors in requests
*/

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                error: payload,
                loading: false
            };
        
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            };
        
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            };
        
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default:
            return state;
    }
}