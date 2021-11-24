const express = require('express');
const router = express.Router();
const auth = require ('../../middleware/auth');
const User = require('../../models/Users');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require('config');

const {check, validationResult} = require('express-validator/check');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
    '/', 
    [
    check('email', 'Must fill email address').isEmail(),
    check('password', 
        'Password is required!'
        ).exists()
    ], 
    // added async to make the method follow async-await protocol
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        
        const { email, password } = req.body;

        try{
        // See if user exists
        
        // Get the user using email attrib
        let user = await User.findOne({ email });

        if (!user){
            res.status(400)
            .json({errors: [{ msg: 'Invalid username/password. '}]});
        }

        const isMatch = await bcrypt.compare( password, user.password );
        
        if (!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid username/password.' }] });
        }

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