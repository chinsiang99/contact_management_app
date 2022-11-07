// this file contains api logic functions and communicate the data object model build using mongoose

const Contact = require("../model/contactModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sanitizeHtml = require('sanitize-html');

// getting all contacts
const getAllContacts = asyncHandler(async (req, res, next) => {
    const { id } = req.user;

    try{
        const getAllContacts = await Contact.where("User").equals(id);
        if (getAllContacts.length > 0) {
            res.status(200).json({
                status: 200,
                message: "Get All Contacts Successfully",
                contactList: getAllContacts
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "There are no contacts found, please create some contacts",
            });
        }
    }catch(e){
        res.status(400);
        throw new Error("There is something wrong with the request, please check the inputted data!");
    }
    

    


});

// get specific contact details with contact id
const getSpecificContact = asyncHandler(async (req, res, next) => {
    const { contact_id } = req.params;
    const { id } = req.user;

    try{
        const getSpecificContact = await Contact.where("_id").equals(contact_id).where("User").equals(id);
        if (getSpecificContact.length > 0) {
            res.status(200).json({
                status: 200,
                message: "Get Specific Contact Details Successfully",
                contactDetails: getSpecificContact[0]
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "The specific contact does not exist!"
            });
        }
    }catch(e){
        res.status(400);
        throw new Error("There is something wrong with the request, please check the inputted data!");
    }
    

    

});

// create new contact
const createContact = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const { name, email, phone } = req.body;

    // check whether every fields are filled in
    if (!name || !email || !phone) {
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
            User: sanitizeHtml(id),
            name: sanitizeHtml(name),
            email: sanitizeHtml(email),
            phone: sanitizeHtml(phone)
        });
        res.status(201).json({
            status: 201,
            message: "Create Contact Successful!"
        })
    } catch (e) {
        const errorMessage = e.message;
        res.status(500);
        throw new Error(errorMessage);
    }

});

// update contact with contact id
const updateContact = asyncHandler(async (req, res, next) => {
    const { contact_id } = req.params;
    const { name, email, phone } = req.body;
    const { id } = req.user;

    // check whether every fields are filled in
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const regex = /\S+@\S+\.\S+/;

    // email format validation
    if (!email.match(regex)) {
        res.status(400);
        throw new Error("Invalid email format, please insert a valid email format");
    }

    try{
        const updateContact = await Contact.where("_id").equals(contact_id).where("User").equals(id);
        if (updateContact.length > 0) {
            updateContact[0].name = sanitizeHtml(name);
            updateContact[0].email = sanitizeHtml(email);
            updateContact[0].phone = sanitizeHtml(phone);
            updateContact[0].updatedAt = Date.now();
            try {
                await updateContact[0].save();
                res.status(200).json({
                    status: 200,
                    message: "Update Contact Successfully",
                });
            } catch (e) {
                res.status(500);
                throw new Error("Failed to Update Contact");
            }
    
        } else {
            res.status(400);
            throw new Error("Specific Contact Does Not Exist!");
        }
    }catch(e){
        res.status(400);
        throw new Error("Specific Contact Does Not Exist!");
    }

});

// delete specific contact with contact id
const deleteContact = asyncHandler(async (req, res, next) => {
    const { contact_id } = req.params;
    const { id } = req.user;

    try{
        const deleteContact = await Contact.where("_id").equals(contact_id).where("User").equals(id);

        if (deleteContact.length > 0) {
            try{
                await deleteContact[0].remove();
                res.status(200).json({
                    status: 200,
                    message: "Delete Contact Successfully"
                })
            }catch(e){
                res.status(500);
                throw new Error("Failed to Delete Contact");
            }
            
        } else {
            res.status(400);
            throw new Error("Specific Contact Does Not Exist!");
        }

    }catch(e){
        res.status(400);
        throw new Error("There is something wrong with the request, please check the inputted data!");
    }

})


module.exports = { createContact, getAllContacts, getSpecificContact, updateContact, deleteContact }