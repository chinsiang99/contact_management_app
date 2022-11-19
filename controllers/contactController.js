// this file contains api logic functions and communicate the data object model build using mongoose

const Contact = require("../model/contactModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// getting all contacts
const getAllContacts = asyncHandler(async (req, res, next) => {
    const { id } = req.user;

    try {
        const getAllContacts = await Contact.find({ User: id });
        if (getAllContacts.length > 0) {
            res.status(200).json({
                status: 200,
                message: "Get All Contacts Successfully",
                contactList: getAllContacts
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "There are no contacts found, please create some contacts",
            });
        }
    } catch (e) {
        res.status(500);
        throw new Error("There is something wrong with the request, please check the inputted data!");
    }

});

// get specific contact details with contact id
const getSpecificContact = asyncHandler(async (req, res, next) => {
    const { contact_id } = req.params;
    const { id } = req.user;

    try {
        const getSpecificContact = await Contact.findOne({ _id: contact_id, User: id });
        if (getSpecificContact) {
            res.status(200).json({
                status: 200,
                message: "Get Specific Contact Details Successfully",
                contactDetails: getSpecificContact
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "The specific contact does not exist!"
            });
        }
    } catch (e) {
        res.status(500);
        throw new Error("There is something wrong with the request, please check the inputted data!");
    }

});

// create new contact
const createContact = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const { name, email, phone } = req.body;

    // check whether every fields are filled in
    if (!(name && email && phone)) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    try {
        const createContact = await Contact.create({
            User: id,
            name: name,
            email: email,
            phone: phone
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

    try {
        const updateContact = await Contact.findOne({ _id: contact_id, User: id });
        if (updateContact) {
            updateContact.name = name ?? updateContact.name;
            updateContact.email = email ?? updateContact.email;
            updateContact.phone = phone ?? updateContact.phone;
            try {
                await updateContact.save();
                res.status(200).json({
                    status: 200,
                    message: "Update Contact Successfully",
                });
            } catch (e) {
                res.status(500);
                throw new Error(e.message);
            }

        } else {
            res.status(404);
            throw new Error("Specific Contact Does Not Exist!");
        }
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }

});

// delete specific contact with contact id
const deleteContact = asyncHandler(async (req, res, next) => {
    const { contact_id } = req.params;
    const { id } = req.user;

    try {
        const deleteContact = await Contact.findOneAndDelete({ _id: contact_id, User: id });

        if (deleteContact) {
            res.status(200).json({
                status: 200,
                message: "Delete Contact Successfully"
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "Specific Contact Does Not Exist!"
            })
        }
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }

})

module.exports = { createContact, getAllContacts, getSpecificContact, updateContact, deleteContact }