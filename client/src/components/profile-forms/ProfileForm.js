import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfileAct, getCurrProfile } from '../../actions/profile';


/**
 *  Mostly based on the the values we got on Create Profile and vals we passed via the API on the backend 
 */
const initState = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    meta: '',
    linkedin: '',
    youtube: '',
    instagram: ''
};

const ProfileForm = ({
    profile: { profile, loading },
    createProfileAct,
    getCurrProfile
}) => {
    const [formData, setFormData] = useState(initState);
    const creatingProfile = useMatch('/create-profile');
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        // If there is no profile, try to get one
        if (!profile){
            getCurrProfile();
        }

        // if we load a profile and have it, extract profileData from it
        if (!loading && profile){
            const profileData = { ...initState };
            // parse through profiles using index val. 'ind'
            for (const ind in profile){
                // if index 'ind' val. is found in profileData, set profileData to corresponding profile value
                if (ind in profileData){
                    profileData[ind] = profile[ind];
                }
            }
            // parse through profiles using 'secInd' index value
            for (const secInd in profile.social){
                // if index val. found, set the profileData to corresponding profile's social attrib value(s)
                if (secInd in profileData){
                    profileData[secInd] = profile.social[secInd];
                }
            }
            // if we already have values within the profileData's skill array, we simply concat/add them using a join and format it is csv
            if (Array.isArray(profileData.skills)){
                profileData.skills = profileData.skills.join(', ');
            }
            setFormData(profileData);
        }
    }, [loading, getCurrProfile, profile]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        meta,
        linkedin,
        youtube,
        instagram   
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = (e) => {
        e.preventDefault();
        createProfileAct(formData, navigate, profile ? true : false);
    };
    // return value(s) picked up from CreateProfile
    return(
        <section className = "container">
            <h1 className="large text-primary">
            {creatingProfile? 'Create Your Profile' : 'Edit Your Profile'}
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> 
                {creatingProfile ? 
                `Let's get some information to make your
                profile stand out`
                : 'Update your profile'
                }
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit= { onSubmit }>
                <div className="form-group">
                    <select name="status" value= { status } onChange= { onChange }>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value= { company } onChange={ onChange } />
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value= { website } onChange = { onChange } />
                    <small className="form-text">
                        Could be your own or a company website
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value= { location } onChange = { onChange }/>
                    <small className="form-text">
                        City & state suggested (eg. Patiala, PB)
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value= { skills } onChange = { onChange }/>
                    <small className="form-text">
                        Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value= { githubusername } 
                        onChange = { onChange }
                    />
                    <small className="form-text">
                        If you want your latest repos and a Github link, include your
                        username
                    </small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value= { bio } onChange = { onChange }></textarea>
                    <small className="form-text">
                        Tell us a little about yourself
                    </small>
                </div>

                <div className="my-2">
                <button onClick= {() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
                </div>
                
                 {displaySocialInputs && (
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value= { twitter } onChange = { onChange }/>
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Meta URL" name="meta" value= { meta } onChange = { onChange } />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value= { youtube } onChange = { onChange } />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value= { linkedin } onChange = { onChange }/>
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value= { instagram } onChange = { onChange }/>
                        </div>
                     </Fragment>
                     )}   

                
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="dashboard.html">Go Back</Link>
            </form>    
        </section>
    ); 
};

// set property type values
ProfileForm.propTypes = {
    createProfileAct: PropTypes.func.isRequired,
    getCurrProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfileAct, getCurrProfile}) (ProfileForm);