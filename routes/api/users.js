const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

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
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        console.log(req.body);
        res.send ('User route');
    }
);

module.exports = router;