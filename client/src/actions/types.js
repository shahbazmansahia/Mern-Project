
export const SET_ALERT = 'SET_ALERT';

export const REMOVE_ALERT = 'REMOVE_ALERT';
// for user registration
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
// for user authentication via token and session implementation
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
// for user login
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
// for implementing Logout
export const LOGOUT = 'LOGOUT';
// for profile reducers and get current profiles
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_ERROR = 'PROFILE_ERROR';
// for sanitizing profile data after logout
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
// for adding the education and experiences sections
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
// for deleting account
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';
// for getting all profiles
export const GET_PROFILES = 'GET_PROFILES';
// for getting github repo for/from the profile
export const GET_REPOS = 'GET_REPOS';
// for getting posts
export const GET_POSTS = 'GET_POSTS';
export const POST_ERROR = 'POST_ERROR';
// for implementing likes and unlikes
export const UPDATE_LIKES = 'UPDATE_LIKES';
// for deleting and adding posts
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';
// for getting (singular!) post
export const GET_POST = 'GET_POST';
// for adding and removing comments on posts
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';