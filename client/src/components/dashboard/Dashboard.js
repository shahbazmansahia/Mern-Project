import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrProfile } from '../../actions/profile';

// import spinner component for loading
import Spinner from '../layout/Spinner';

import { Link } from 'react-router-dom';

import DashboardActions from './DashboardActions';

import Experience from './Experience';
import Education from './Education';

// for deleting account and all its data
import { delAccount } from '../../actions/profile'

// Pulling out profile and loading from profile
const Dashboard = ({ getCurrProfile, auth: { user }, profile: { profile }, delAccount}) => {
    useEffect(() => {
        getCurrProfile();
    }, [getCurrProfile]);
    
    return (
        <section className="container">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {user && user.name}
            </p>
            {profile !== null ? (
                <>
                <DashboardActions />
                <Experience experience= {profile.experience}/>
                <Education education= {profile.education}/>
                <div className="my-2">
                    <button className="btn btn-danger" onClick= {() => delAccount()}>
                        <i className="fa fa-user-minus"></i> Delete My Account
                    </button>
                </div>
                </>
            ) : (
                <>
                    <p>You have yet to setup a profile. Please do so as early as possible.</p>
                    <Link to= "/create-profile" className = "btn btn-primary my-1">
                        Create Profile
                    </Link>
                </>
            )}
        </section>
    );
    /* NOTE: DEPRECATED CODE. REPLACED WITH CODE COMPATIBLE WITH REACT ROUTER V6
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className = "large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name }
        </p>
        { profile !== null ? 
            <Fragment> 
                <DashboardActions /> 
            </Fragment> : 
            <Fragment>
                <p>You have yet to setup a profile. Please do so as early as possible.</p>
                <Link to= "/create-profile" className = "btn btn-primary my-1">
                    Create Profile
                </Link>
            </Fragment> }
    </Fragment>;
    */
};

Dashboard.propTypes = {
 getCurrProfile: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 profile: PropTypes.object.isRequired,
 delAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrProfile, delAccount }) (Dashboard);
