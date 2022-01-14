// This represents a collective of Profiles; specifically, a colletive of ProfileItems
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    
    return (
        <section className="container">
            { loading ? (
                <Spinner /> 
            ):(
                <Fragment> 
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"/> Browse and connect with developers
                    </p>
                    <div className="profiles">
                        {//console.log(` Profiles at disposal: ${profiles.length}`)
                        }
                        {// FIX ME: THIS PROFILES => PROFILE MAP COMPONENT IS BREAKING THE CODE! IT FETCHES NULL AS PROFILE (I SUSPECT IT FETCHES THE singular and deleted null curr profile obj.)
                        // check if any profiles even exist; if the do, render them. if not, print 'no profiles found' statement
                        profiles.length > 0 ? (
                            profiles.map((profile) =>(
                                <ProfileItem key={profile._id} profile={profile} />
                                )
                            )
                        ) : (
                            <h4> No Profiles found. </h4>
                            )
                        }
                    </div>
                </Fragment>
            )}
        </section>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect (mapStateToProps, { getProfiles })(Profiles);
