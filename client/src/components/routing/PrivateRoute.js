import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

// NOTE: Newer version; adapted for react router 6. Sound to use with hooks
const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading }
}) => {
    if (loading){
        return <Spinner />;
    }
    if (isAuthenticated){
        return <Component />;
    }

    return <Navigate to="/login" />;
};


/* NOTE: OLDER VERSION; DEPRECATED IN REACT ROUTER 6
// Destructured props

const PrivateRoute = ({ component: Component, auth : { isAuthenticated, loading }, ...rest}) => {
    return(
        <Route 
            {...rest} 
            render= {props => 
                (!isAuthenticated && !loading) ? (
                <Navigate to='/login' />
                ) : (
                <Component {...props}/>
                )
            } 
        />
    );    
};
*/
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps)(PrivateRoute);
