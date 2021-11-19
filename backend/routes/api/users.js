const express = require('express');
const router = express.Router();

//@route GET api for users
router.get('/', (req, res) => res.send('route: users'));

module.exports = router;