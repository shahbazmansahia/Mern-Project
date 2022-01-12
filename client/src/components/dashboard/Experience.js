import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// moment is a 3rd party dependency we installed earlier
import Moment from 'react-moment';
// experience gets components passed from Dashboard.js;
// therefore, we replaced props with that
const Experience = ({ experience }) => {
    // we map the experience array we get from the dashboard as a component
    const experiences = experience.map(exp => (
        <tr key = {exp.id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format= 'YYYY/MM/DD'>{exp.from}</Moment> - {' '}
                {// since the 'to' attrib can be null if it's a current occupation...
                    exp.to === null ? (
                        ' Now'
                        ) : (
                        <Moment format= 'YYYY/MM/DD'>{exp.to}</Moment>
                    )
                }
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));
    
    return (
        <div>
            <h2 className="my-2"> Experience Credentials </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </div>
    );
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired
}

export default Experience;
