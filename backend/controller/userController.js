const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

// register user

const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password, pic} = req.body;

    //check whether user exists in the db

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400)
        throw new Error('User Already Exists');
    }

    //create new user
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),


        })
        console.log("user added!");
    } else {
        res.status(400)
        throw new Error("Error Occured!");
    }

   
});

// login user
const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),

        })
        console.log("successfully logged in!");
    } else {
        res.status(400)
        throw new Error("Invalid Email or password!");
    }

   
});

module.exports = {registerUser, authUser};