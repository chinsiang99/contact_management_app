// this file contains api logic functions and communicate the data object model build using mongoose

const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// getting all users
const getUsers = asyncHandler(async (req, res, next) => {
    try {
        const allUsers = await User.find();
        if (allUsers.length > 0) {
            res.status(200).json({
                status: 200,
                allUsers: allUsers
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "No users found, please register some users to proceed!"
            })
        }
    } catch (e) {
        res.status(500);
        throw new Error(errorMessage);
    }

});

// register a user
const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    // check either username, email or password is not filled
    if (!(username && email && password)) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const duplicateEmail = await User.findOne({ email: email });

    if (duplicateEmail) {
        throw new Error(`Duplicate email: ${email}`);
    }

    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hash = await bcrypt.hash(password, salt);

    try {
        const createUser = await User.create({
            username: username,
            email: email,
            password: hash
        });
        res.status(201).json({
            status: 201,
            message: "Register Successfully!"
        })
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }

});

// login a user and return a jwt token if success
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // check either email or password is not filled
    if (!(email && password)) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // check whether the email is registered
    const user = await User.findOne({ email: email });

    if (!user) {
        res.status(401);
        throw new Error("Email is not registered");
    }

    // compare the password to check whether they match each other
    authorized = await bcrypt.compare(password, user.password);

    if (authorized) {
        const accessToken = jwt.sign(
            {
                user: {
                    id: user._id,
                },
            },
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "24h" }
        );
        res.status(200).json({
            status: 200,
            token: accessToken
        })

    } else {
        res.status(401);
        throw new Error("Invalid password");
    }
})

// get current user with decoded jwt token
const getCurrentUser = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const currentUser = await User.findById(id);

    if (currentUser) {
        res.status(200).json({
            status: 200,
            message: "Retrieve Current User Detail Successful",
            userDetail: currentUser
        })
    } else {
        res.status(404);
        throw new Error("No Record found");
    }
})

module.exports = { getUsers, registerUser, loginUser, getCurrentUser }