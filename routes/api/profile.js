const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profiles');
const User = require('../../models/Users');
const Post = require('../../models/Posts');

const { check, validationResult } = require('express-validator/check'); 

const request = require ('request');
const config = require ('config');

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
router.post('/me', [auth, [
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
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile){
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields },
                { new: true }
                );
            
            return res.json(profile);
        }

        profile = new Profile(profileFields);

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


// @route   GET api/profile
// @desc    Get all profiles
// @access  Public

router.get('/', async (req, res) => {
 try {
     const profiles = await Profile.find().populate('user', ['name', 'avatar']);
     res.json(profiles);
 } catch (err) {
     console.error('Get all profile error: '. err.message);
     res.status(500).send ('Get all profiles: Server Error');
 }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile with user <ID>
// @access  Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id  }).populate('user', ['name', 'avatar']);
        
        if (!profile){
            return res.status(400).json({ msg: 'No profile with this userID exists!' });
        }

        res.json(profile);


    } catch (err) {
        console.error('Get profile using id error: '. err.message);
        if (err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'No profile with this userID exists!' });
        }
        res.status(500).send ('Get all profiles: Server Error');
    }
});

   
// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private

router.delete('/', auth, async (req, res) => {
    try {
        // remove users posts
        await Post.deleteMany({ user: req.user.id});

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id : req.user.id });
        
        res.json({msg : 'User removed'});

    } catch (err) {
        console.error('Delete profile error: '. err.message);
        res.status(500).send ('Delete profile: Server Error');
    }
});
   
   
// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [ auth , [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
    
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // destructuring; pulling stuff out from request
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    // creating object with user-submitted data
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});
        // unshift is the same as 'push' method but unlike push, it pushes data to the beginning instead of the end of the stack/db/collection
        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Put Profile xp: Server Error');
    }

});

// @route   DELETE api/profile/experience/:edu_id
// @desc    Delete most recently added profile experience
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf (req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Delete Profile xp: Server Error');
    }
});

   
// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [ auth , [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
    check('fieldofstudy', 'field of study is required').not().isEmpty()
    
    
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // destructuring; pulling stuff out from request
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    // creating object with user-submitted data
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});
        // unshift is the same as 'push' method but unlike push, it pushes data to the beginning instead of the end of the stack/db/collection
        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Put Profile edu: Server Error');
    }

});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete most recently added profile education
// @access  Private

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        
        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf (req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Delete Profile edu: Server Error');
    }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public

router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js' }
        };

        request (options, (error, response, body) => {
            if (error){
                console.error (error);
            }

            if(res.statusCode != 200){
               return res.status(404).json({ msg: 'No github profile found'});
            }

            res.json(JSON.parse(body));
        });
    } catch (error) {
     
        console.error(error.message);
        res.status(500).send('Get github profile : Server Error');   
    }
});


module.exports = router;