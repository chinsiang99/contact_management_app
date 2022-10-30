// const mongoose = require("mongoose");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
// const UserModel = require("../model/userModel");

const getUsers = asyncHandler((req, res, next) => {
    res.json({
        text: "I am a controller!"
    })
});

const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, createdAt, updatedAt } = req.body;
    // const user = await User.create({

    // })
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

module.exports = { getUsers, validateEmail }