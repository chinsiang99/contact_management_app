// const mongoose = require("mongoose");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
// const bcrypt = require("");
const bcrypt = require('bcrypt');

const getUsers = asyncHandler(async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.status(200).json({
            allUsers: allUsers
        })
    } catch (e) {
        const errorMessage = e.message;
        res.status(500);
        throw new Error(errorMessage);
    }


});

const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    // regex for email
    const regex = /\S+@\S+\.\S+/;
    // const regex2 = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // check either username, email or password is not filled
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // email format validation
    if (!email.match(regex)) {
        res.status(400);
        throw new Error("Invalid email format, please insert a valid email format");
    }

    const duplicateEmail = await User.where("email").equals(email).limit(1);

    if (duplicateEmail.length > 0) {
        throw new Error(`Duplicate email: ${email}`);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
        const createUser = await User.create({
            username: username,
            email: email,
            password: hash
        });
        console.log(createUser);
        res.status(201).json({
            message: "Register Successfully!"
        })
    } catch (e) {
        const errorMessage = e.message;
        res.status(500);
        throw new Error(errorMessage);
    }

});

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // check either username, email or password is not filled
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.where("email").equals(email);
    if (!user.length) {
        res.status(401);
        throw new Error("Email is not registered");
    }

    // compare the password to check whether they match each other
    authorized = await bcrypt.compare(password, user[0].password);

    if (authorized) {

    } else {
        res.status(401);
        throw new Error("Invalid password");
    }
})

const validateEmail = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    // if (!email.includes("@")) {
    //     throw new Error("Invalid email format, should be : xxx@xxx.xx");
    // }
    const user = await User.where("email").equals(email)
    console.log(user.length);
    if (!user.length) {
        res.status(400);
        throw new Error("WOW ERROR");
    }
})

module.exports = { getUsers, registerUser, validateEmail, loginUser }