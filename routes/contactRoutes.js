const { Router } = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {createContact, getAllContacts, getSpecificContact} = require("../controllers/contactController");
const validateUserExists = require("../middleware/validateUserExist");
// const {create}

const router = Router();

// define routes after the "/contacts/" prefix
// api/contacts/

// since all the endpoint inside contact route should be private, so every endpoint will have to gone through validate token middleware and validate whether the user exists
router.use(validateToken);
router.use(validateUserExists);

router.route("/").get((req, res, next) => {
    console.log("hello there !");

})

router.route("/createContact").post(
    createContact
);

router.route("/getAllContacts").get(
    getAllContacts
);

router.route("/getSpecificContact/:contact_id").get(
    getSpecificContact
);

module.exports = router;