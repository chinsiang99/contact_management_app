const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const validateUserExists = asyncHandler(async (req, res, next) => {
    const {id} = req.user;
    // check whether the user exists in the database
    const userExist = await User.where("_id").equals(id);
    if (userExist.length < 0){
        throw new Error("User not exist!");
    }
    next();
});

module.exports = validateUserExists


