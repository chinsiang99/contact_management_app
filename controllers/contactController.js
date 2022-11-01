const Contact = require("../model/contactModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// getting all contacts
const getAllContacts = asyncHandler(async (req,res,next)=>{
    const {id} = req.user;

    try{
        const getAllContacts = await Contact.where("User").equals(id);
        console.log(getAllContacts);
        res.status(200).json({
            status: 200,
            message: "Get All Contacts Successfully",
            contactList: getAllContacts
        });
    }catch(e){
        const errorMessage = e.message;
        res.status(500);
        throw new Error(errorMessage);
    }
});

// get specific contact details with contact id
const getSpecificContact = asyncHandler(async (req,res,next)=>{
    const {contact_id} = req.params;

    try{
        const getSpecificContact = await Contact.where("_id").equals(contact_id);

        res.status(200).json({
            status: 200,
            message: "Get Specific Contact Details Successfully",
            contactDetails: getSpecificContact[0]
        });
    }catch(e){
        const errorMessage = e.message;
        res.status(500);
        throw new Error(errorMessage);
    }
});

const createContact = asyncHandler(async (req,res,next)=>{
    const {id} = req.user;
    const {name, email, phone} = req.body;

    // check whether every fields are filled in
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const regex = /\S+@\S+\.\S+/;

    // email format validation
    if (!email.match(regex)) {
        res.status(400);
        throw new Error("Invalid email format, please insert a valid email format");
    }

    try {
        const createContact = await Contact.create({
            User: id,
            name: name,
            email: email,
            phone: phone
        });
        console.log(createContact);
        res.status(201).json({
            message: "Create Contact Successful!"
        })
    } catch (e) {
        const errorMessage = e.message;
        res.status(500);
        throw new Error(errorMessage);
    }

});



module.exports = { createContact, getAllContacts, getSpecificContact}