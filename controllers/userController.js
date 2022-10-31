// const mongoose = require("mongoose");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler((req, res, next) => {
    res.json({
        text: "I am a controller!"
    })
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
    if(!email.match(regex)){
        res.status(400);
        throw new Error("Invalid email format, please insert a valid email format");
    }

    // console.log("hello");

    res.json({
        text: "Created Successfully"
    })
    
    const duplicateEmail = await User.where("email").equals(email).limit(1);

    console.log(duplicateEmail);

    res.json({
        text: "Created Successfully"
    })


});

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

module.exports = { getUsers, registerUser, validateEmail }