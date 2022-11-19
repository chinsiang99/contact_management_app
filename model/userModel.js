const mongoose = require("mongoose");
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// schema for user

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username"]
    },
    email: {
        type: String,
        validate: [validateEmail, 'Please fill a valid email address'],
        required: [true, "Please add the user email address"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);