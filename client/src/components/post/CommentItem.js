import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { delComment } from '../../actions/post';
import Moment from 'react-moment';

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    delComment
 }) => {
    
    return (
        <div class="comments">
            <div class="post bg-white p-1 my-1">
                <div>
                    <Link to= {`/profile/${user}`} >
                    <img
                        class="round-img"
                        src={avatar}
                        alt=""
                    />
                    <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p class="my-1">
                        {text}
                    </p>
                    <p class="post-date">
                        Posted on <Moment format= 'YYYY/MM/DD'>{date}</Moment>
                    </p>
                    {!auth.loading && user === auth.user._id && (
                        <button onClick= {() => delComment(postId, _id)} className= "btn btn-danger">
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>  
    );
};

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    delComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect (mapStateToProps, { delComment }) (CommentItem);
