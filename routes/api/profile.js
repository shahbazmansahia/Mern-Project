const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profiles');
const User = require('../../models/Users');

const { check, validationResult } = require('express-validator/check'); 

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try{
        // create a user and populate user, [name and populate] fields with values in User model; bring in 'name and avatar' from 'user' 
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']) ;

        if (!profile){
            return res.status(400).json({ msg: 'No such profile exists!'});
        }

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile/me
// @desc    Create/Update User profile
// @access  Private
router.post('/', [auth, [
    check('status', 'Status is required')
    .not()
    .isEmpty(),
    check('skills', 'Skills is required')
    .not()
    .isEmpty()
]],
 async (req, res) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
     }

     // if valid, pull all the listed details from the req.body:
     const {
         company,
         website,
         location,
         bio,
         status,
         githubusername,
         skills,
         youtube,
         meta,
         twitter,
         instagram,
         linkedin
     } = req.body;

     // Init and Build/Declare profile object

     const profileFields= {};
     // Why is this not picking up the user field from Profile model???
     // NOTE: CAUSE OF ERROR DOWN BELOW!
     profileFields.user = req.user.id;

     if (company){
         profileFields.company = company;
     }
     if (website){
         profileFields.website = website;
     }
     if (location){
         profileFields.location = location;
     }
     if (bio){
         profileFields.bio = bio;
     }
     if (status){
         profileFields.status = status;
     }
     if (githubusername){
         profileFields.githubusername = githubusername;
     }
     if (skills){
         profileFields.skills = skills.split(',').map(skill => skill.trim());
     }

     // Build social obj
     profileFields.social = {};
     if (youtube){
        profileFields.social.youtube = youtube;
     }
     if (twitter){
        profileFields.social.twitter = twitter;
    }
    if (meta){
        profileFields.social.meta = meta;
    }
    if (linkedin){
        profileFields.social.linkedin = linkedin;
    }
    if (instagram){
        profileFields.social.instagram = instagram;
    }

    try{    // FIX ME: ERRORS ON req.user lines!
        let profile = await Profiles.findOne({ user: req.user.id });
        if (profile){
            // Update
            profile = await Profiles.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields },
                { new: true }
                );
            
            return res.json(profile);
        }

        profile = new Profiles(profileFields);

        await profile.save();
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error: Profile');
    }
    console.log(profileFields.social.twitter);

     res.send('Hellaye');



 } 
);

module.exports = router;