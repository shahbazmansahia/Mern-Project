// A COLLECTION FOR POST ITEMS [SIMILAR TO PROFILE-PROFILE ITEM STRUCTURE]
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    
    return ( loading ? <Spinner /> : (
        <Fragment>
            <div className="container">
                <h1 className="large text-primary">
                    <p className="lead">
                        <i className="fas fa-user"></i> Welcome to the community!
                    </p>
                    {/* PostForm */}
                    <div className="posts">
                        {posts.map(post => (
                            <PostItem key= {post._id} post={post} />
                        ))}
                    </div>
                </h1>
            </div>
        </Fragment>
        )
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})


export default connect(mapStateToProps, { getPosts }) (Posts);