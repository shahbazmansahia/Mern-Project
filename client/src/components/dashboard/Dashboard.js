import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrProfile } from '../../actions/profile';

// import spinner component for loading
import Spinner from '../layout/Spinner';

import { Link } from 'react-router-dom';

// Pulling out profile and loading from profile
const Dashboard = ({ getCurrProfile, auth: { user }, profile: { profile, loading }}) => {
    useEffect(() => {
        getCurrProfile();
    }, []);
    
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className = "large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name }
        </p>
        { profile !== null ? <Fragment>has</Fragment> : 
        <Fragment>
            <p>You have yet to setup a profile. Please do so as early as possible.</p>
            <Link to= "/create-profile" className = "btn btn-primary my-1">
                Create Profile
            </Link>
        </Fragment> }
    </Fragment>;
}

Dashboard.propTypes = {
 getCurrProfile: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrProfile }) (Dashboard);
