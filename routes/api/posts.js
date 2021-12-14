const express = require('express');
const router = express.Router();
const { check, validationResult } = require ('express-validator/check');
const auth = require ('../../middleware/auth');

const Post = require ('../../models/Posts');
const Profile = require ('../../models/Profiles');
const User = require ('../../models/Users');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', 
[auth, [
        check('text', 'Text is required').not().isEmpty()
        ]
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    
    try {
        
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            // from request
            text: req.body.text,
            // from user obj
            name: user.name,
            avatar: user.avatar,
            // from request
            user: req.user.id
            });
        const post = await newPost.save();

        res.json(post);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Posts route: Server Error');
    }


});


// @route   GET api/posts
// @desc    Get all posts
// @access  Private

router.get('/', [auth],
async (req, res) => {
    try {
        // get all posts and sort them in ascending order by date (we'd do +1/1 for descending order)
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send ('Post route: Server Error!');
    }
});


// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private

router.get('/:id', [auth],
async (req, res) => {
    try {
        // get post for listed id 
        const post = await Post.findById(req.params.id);
        
        if (!post){
            return res.status (404).json({ msg: 'Post not found' });
        }
        
        res.json(post);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId'){
            return res.status (404).json({ msg: 'Post not found' });
        }
        
        res.status(500).send ('Post route: Server Error!');
    }
});


// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private

router.delete('/:id', [auth],
async (req, res) => {
    try {
        // Delete post given ID
        const post = await Post.findById(req.params.id);
        
        if (!post){
            return res.status (404).json({ msg: 'Post not found' });
        }

        // Check user creds
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'The User does not have permissions to do this.'});
        }
        
        await post.remove();

        res.json({msg: 'Post removed'});
    } catch (error) {
        console.error(error.message);

        if (error.kind === 'ObjectId'){
            return res.status (404).json({ msg: 'Post not found' });
        }
        res.status(500).send ('Post route: Server Error!');
    }
});



module.exports = router;