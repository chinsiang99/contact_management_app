const { Router } = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {createContact} = require("../controllers/contactController");
// const {create}

const router = Router();

// define routes after the "/contacts/" prefix
// api/contacts/

// since all the endpoint inside contact route should be private, so every endpoint will have to gone through validate token middleware
router.use(validateToken);

router.route("/").get((req, res, next) => {
    console.log("hello there !");

})

router.route("/createContact").post(
    createContact
);

module.exports = router;