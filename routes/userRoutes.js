const { Router } = require("express");
const { getUsers, registerUser, validateEmail } = require("../controllers/userController");

const router = Router();

// define routes after the "/users/" prefix
// api/users/

// route to register user
router.route("/registerUser").get(
    registerUser
);

router.route("/controller").get(
    validateEmail
);


// endpoint starts with api/user/

router.route("/").get((req, res, next) => {
    res.json({
        text: "hello there"
    })
})

module.exports = router;