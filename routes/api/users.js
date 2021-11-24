const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require('config');

const {check, validationResult} = require('express-validator/check');

// Extract user model
const User = require ('../../models/Users');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    '/', 
    [
    check('name', 'Must fill in name')
        .not()
        .isEmpty(),
    check('email', 'Must fill email address').isEmail(),
    check('password', 
        'Please enter a password between 6 or more characters'
        ).isLength({
            min: 6
        })
    ], 
    // added async to make the method follow async-await protocol
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        
        const { name, email, password} = req.body;

        try{
        /* See if user exists */
        
        // Get the user using email attrib
        let user = await User.findOne({ email });

        if (user){
            res.status(400).json({errors: [{ msg: 'User already exists! '}]});
        }
        /* Get users gravatar */

        const avatar = gravatar.url(email, {
            // default size of string 200
            s: 200,
            // apply censor settings
            r:'pg',
            // mm gives you a default image for gravatar profile
            d:'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        /* Encrypt Password*/

        // generate salt to encyrpt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        /* Return jsonwebtoken*/
        
        // Creating payload...
        const payload = {
            user: {
                // mongoDB's _id attribute
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000},
            (err, token) => {
                if (err) throw err;
                res.json({ token });
                }
            );

        // res.send('User registered');
    
        //res.send ('User route');

        } catch (err){
            console.error(err.message);
            res.status(500).send('Server error!');
        }
        
        console.log(req.body);
    }
);

module.exports = router;