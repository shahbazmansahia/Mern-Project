import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { incLike, decLike, delPost } from '../../actions/post';

// FIX ME: THE PROFILE LINK IS BROKEN, THE LIKE/UNLIKE AND DELETE POST BUTTONS ARE NOT WORKING AT ALL
//         THE CONSOLE SIMPLY TELLS US THAT THE METHODS ARE NOT DEFINED; DESPITE BEING IMPORTED

const PostItem = ({ auth, post: { _id, text, name, avatar, user, likes, comments, date}, incLike, decLike, delPost, showActions
}) => {
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            {/* FIX ME: THE PROFILE LINK BELOW IS BROKEN */}
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
            <p className="post-date">
                Posted on <Moment format= 'YYYY/MM/DD'>{date}</Moment>
            </p>
            { showActions && 
              <Fragment>
                <button onClick ={() => incLike(_id)} type="button" className="btn btn-light">
                  <i className="fas fa-thumbs-up"></i> {' '}
                  <span>{ likes.length > 0  && (<span>{likes.length}</span>) }</span>
                </button>
                <button onClick= {() => decLike(_id)} type="button" className="btn btn-light">
                  <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/posts/${_id}`} className="btn btn-primary">
                  Discussion {' '} { comments.length > 0  && (<span className='comment-count'>{comments.length}</span>) }
                </Link>
                {!auth.loading && user === auth.user._id && (
                  <button onClick= {() => delPost(_id)} type="button" className="btn btn-danger">
                      <i className="fas fa-times"></i>
                  </button>    
                )}
              </Fragment>
            }
            
            
          </div>
        </div>
    );
};

PostItem.defaultProps ={
  showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    incLike: PropTypes.func.isRequired,
    decLike: PropTypes.func.isRequired,
    delPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect (mapStateToProps, { incLike, decLike, delPost}) (PostItem);
