import React from 'react';
import { Route, Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Destructured props
const PrivateRoute = ({ component: Component, auth : { isAuthenticated, loading }, ...rest}) => {
    return(
        <Route 
            {...rest} 
            render= {props => 
                !isAuthenticated && !loading ? (
                <Navigate to='/login' />
                ) : (
                <Component {...props}/>
                )
            } 
        />
    );    
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps)(PrivateRoute);
