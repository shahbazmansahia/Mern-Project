import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const NotFound = (props) => {
  return (
    <Fragment> 
        <h1 className="x-large text-primary">
            <i className="fas fa-exclamation-triangle"></i> 404: Page Not Found!
        </h1>
        <p className="large">Sorry, the page you seem to be looking for doesn't exist!</p>
    </Fragment>
    );
};

NotFound.propTypes = {};

export default NotFound;
