const router = require('express').Router();
let User = require('../models/user.model');
const { registerUser, authUser } = require('../controller/userController');


router.route('/signup').post(registerUser)
router.route('/login').post(authUser)



module.exports = router;