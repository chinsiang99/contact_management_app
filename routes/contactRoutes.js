const { Router } = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {createContact, getAllContacts, getSpecificContact, updateContact, deleteContact} = require("../controllers/contactController");
const validateUserExists = require("../middleware/validateUserExist");

const router = Router();

// define routes after the "/contacts/" prefix
// api/contacts/

// since all the endpoint inside contact route should be private, so every endpoint will have to gone through validate token middleware and validate whether the user exists
router.use(validateToken);
router.use(validateUserExists);

// route to create new contact
router.route("/").post(
    createContact
);

// route to get all contacts
router.route("/").get(
    getAllContacts
);

// route to get specific contact with contact id
router.route("/:contact_id").get(
    getSpecificContact
);

// route to update specific contact with contact id
router.route("/:contact_id").put(
    updateContact
);

// route to delete specific contact with contact id
router.route("/:contact_id").delete(
    deleteContact
);

module.exports = router;