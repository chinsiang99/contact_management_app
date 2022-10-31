const { Router } = require("express");
const { getUsers, registerUser, validateEmail, loginUser } = require("../controllers/userController");

const router = Router();

// define routes after the "/users/" prefix
// api/users/

// route to get all users
router.route("/getUsers").get(
    getUsers
);

// route to register user
router.route("/registerUser").get(
    registerUser
);

// route to login user
router.route("/loginUser").get(
    loginUser
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