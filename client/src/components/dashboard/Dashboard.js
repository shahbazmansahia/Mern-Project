import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrProfile } from '../../actions/profile';

const Dashboard = ({ getCurrProfile, auth, profile}) => {
    useEffect(() => {
        getCurrProfile();
    }, []);
    
    return (
        <div>Dashboard</div>
    )
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
