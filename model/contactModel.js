const mongoose = require("mongoose");
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// schema for contact

const contactSchema = new mongoose.Schema({
    User: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
        lowercase: true
    },
    email: {
        type: String,
        validate: [validateEmail, 'Please fill a valid email address'],
        required: [true, "Please add the contact email address"]
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"]
    }
}, { timestamps: true })

module.exports = mongoose.model("Contact", contactSchema);