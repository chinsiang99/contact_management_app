const { Router } = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {createContact, getAllContacts, getSpecificContact, updateContact} = require("../controllers/contactController");
const validateUserExists = require("../middleware/validateUserExist");

const router = Router();

// define routes after the "/contacts/" prefix
// api/contacts/

// since all the endpoint inside contact route should be private, so every endpoint will have to gone through validate token middleware and validate whether the user exists
router.use(validateToken);
router.use(validateUserExists);

// route to create new contact
router.route("/createContact").post(
    createContact
);

// route to get all contacts
router.route("/getAllContacts").get(
    getAllContacts
);

// route to get specific contact with contact id
router.route("/getSpecificContact/:contact_id").get(
    getSpecificContact
);

// route to update specific contact with contact id
router.route("/updateContact/:contact_id").put(
    updateContact
);

module.exports = router;