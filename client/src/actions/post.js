import api from "../utils/api";
import { setAlert } from './alert';
import {
    DELETE_POST,
    ADD_POST,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

// Get Posts
export const getPosts = () => async dispatch=> {
    try {
        const res = await api.get('/posts');

        dispatch ({
            type: GET_POSTS,
            payload: res.data
        });

    } catch (error) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// Increment a like
export const incLike = postId => async dispatch=> {
    try {
        const res = await api.put(`/posts/like/${postId}`);

        dispatch ({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });

    } catch (error) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};


// Decrement a like
export const decLike = postId => async dispatch=> {
    try {
        const res = await api.put(`/posts/unlike/${postId}`);

        dispatch ({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });

    } catch (error) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// For deleting a post using id
export const delPost = postId => async dispatch=> {
    try {
        const res = await api.delete(`/posts/${postId}`);

        dispatch ({
            type: DELETE_POST,
            payload:  postId
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
        dispatch ({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};


// For add a post using id
export const addPost = formData => async dispatch=> {
    try {
        const res = await api.post(`/posts/`, formData);
        
        dispatch ({
            type: ADD_POST,
            payload:  res.data
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (error) {
        dispatch ({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};

// Get (singular!) Post
export const getPost = postId => async dispatch => {
    try {
        const res = await api.get(`/posts/${postId}`);

        dispatch ({
            type: GET_POST,
            payload: res.data
        });

    } catch (error) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// For add a comment using post id
export const addComment = (postId, formData) => async dispatch=> {
    try {
        const res = await api.post(`/posts/comment/${postId}`, formData);
        
        dispatch ({
            type: ADD_COMMENT,
            payload:  res.data
        });

        dispatch(setAlert('Comment Posted!', 'success'));
    } catch (error) {
        dispatch ({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};

// For add a comment using post id
export const delComment = (postId, commentId) => async dispatch=> {
    try {
        const res = await api.delete(`/posts/comment/${postId}/${commentId}`);
        
        dispatch ({
            type: REMOVE_COMMENT,
            payload:  commentId
        });

        dispatch(setAlert('Comment removed!', 'success'));
    } catch (error) {
        dispatch ({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};