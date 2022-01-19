import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../Posts/PostItem';

// NOTE: Post was null because I declared the constant name as 'postId' instead of id :\
const Post = ({ getPost, post: { post, loading } }) => {
    const { id } = useParams();
    useEffect (() => {
        getPost (id);
    }, [getPost, id]);

    console.log('Getting (singular) post...');
    // FOR TESTING
    console.log('Loading: ' + loading);
    console.log('Post is null?' + (post === null));
    
    return ( (loading || post === null) ? (
        <Spinner />
    ) : (
        <section className = "container">
            <Link to = '/posts' className= 'btn'>
                Back to Posts
            </Link>
            <PostItem post={post} showActions={false} />
        </section>
    )   );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect (mapStateToProps, { getPost }) (Post);
