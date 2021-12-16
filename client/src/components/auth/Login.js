import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
    
    // formData: Object which contains all the form Data
    // setFormData: function for updating state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    // Destructure and pull out form values
    const { email, password } = formData;
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value  });

    const onSubmit = async e => {
        e.preventDefault();
        console.log("Success!");
    }
    return (
        <Fragment>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link
                    href="https://fonts.googleapis.com/css?family=Raleway"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                    integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                    crossorigin="anonymous"
                />

                <link rel="stylesheet" href="css/style.css" />
                <title>Welcome To The Developer Connector</title>
            </head>
            <body>
                <nav className="navbar bg-dark">
                <h1>
                    <a href="index.html"><i className="fas fa-code"></i> DevConnector</a>
                </h1>
                <ul>
                    <li><Link to="profiles.html">Developers</Link></li>
                    <li><Link to="/Register">Register</Link></li>
                    <li><Link to="/Login">Login</Link></li>
                </ul>
                </nav>
                <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead">
                    <i className="fas fa-user"></i>Sign into Your Account
                </p>
                <form className="form" onSubmit = {e => onSubmit(e)} >
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email" 
                            value= { email } 
                            onChange= { e => onChange(e) }
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            
                            value= { password } 
                            onChange= { e => onChange(e) }
                            
                            minLength="6"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/Register">Sign Up</Link>
                </p>
                </section>
            </body>
            </html>

        </Fragment>
    )
}


export default Login