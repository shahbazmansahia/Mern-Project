// This represents a single profile as an item for the Profiles collective
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const ProfileItem = ({ 
    profile: {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills
    }
}) => {
    console.log ('accessing profile items...');
    return (
        /*
        // for testing...
        <div>
            test
        </div>
        */
        
        <div className = "profile bg-light">
          <img src={avatar} alt="a display picture of the user" className="round-img" />
          <div>
              <h2>{name}</h2>
              <p>{status} {company && <span> at {company}</span>}</p>
              <p className="my-1">{location && <span>{location}</span>}</p>
              <Link to= {`/profile/${_id}`} className= 'btn btn-primary'> 
              View Profile
              </Link>
            </div>
            <ul>
                {skills.slice(0, 4).map((skill, index) => (
                <li key= {index} className= "text-primary">
                    <i className="fas fa-check"></i> {skill}
                </li>
                ))}
            </ul>
        </div>
        
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default (ProfileItem);
