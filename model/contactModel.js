const mongoose = require("mongoose");

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
        required: [true, "Please add the contact email address"]
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"]
    }
}, { timestamps: true })

module.exports = mongoose.model("Contact", contactSchema);