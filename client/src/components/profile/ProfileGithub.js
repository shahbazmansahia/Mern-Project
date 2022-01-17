import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGitRepo } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username, getGitRepo, repos}) => {
    useEffect (() => {
        getGitRepo(username);
    }, [getGitRepo(username)]);
    
    return (
        <div>
            
        </div>
    )
}

ProfileGithub.propTypes = {
    getGitRepo: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, { getGitRepo }) (ProfileGithub);
