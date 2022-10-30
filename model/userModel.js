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
    },
    timestamp: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model("User", userSchema);