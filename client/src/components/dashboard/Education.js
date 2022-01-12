import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// moment is a 3rd party dependency we installed earlier
import Moment from 'react-moment';
// experience gets components passed from Dashboard.js;
// therefore, we replaced props with that
const Education = ({ education }) => {
    // we map the Education array we get from the dashboard as a component
    const educations = education.map(edu => (
        <tr key = {edu.id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format= 'YYYY/MM/DD'>{edu.from}</Moment> - {' '}
                {// since the 'to' attrib can be null if it's a current occupation...
                    edu.to === null ? (
                        ' Now'
                        ) : (
                        <Moment format= 'YYYY/MM/DD'>{edu.to}</Moment>
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
            <h2 className="my-2"> Education Credentials </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </div>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired
}

export default Education;
