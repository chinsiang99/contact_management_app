const mongoose = require("mongoose");

// schema for user

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username"]
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);