import{ 
    GET_POSTS,
    POST_ERROR
} from '../actions/types'

/**
 *  initial state attributes:
 *  posts: a collective of post objects
 *  post: a user created post
 *  loading: to test loading of components/show animations while that happens
 *  error: a place/collection of errors for debugging/tracing errors
 */

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function (state= initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        default:
            return state;
    }
}