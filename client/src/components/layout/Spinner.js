// a script to basically imports spinner gif and passes/displays it on page
import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
    <Fragment>
        <img
        src= {spinner}
        style= {{ width: '200px', margin: 'auto', display:'block' }}
        alt = 'Loading...'
        />
    </Fragment>
);