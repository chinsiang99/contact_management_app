const { Router } = require("express");
const { getUsers, registerUser, loginUser, getCurrentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");


const router = Router();

// define routes after the "/users/" prefix
// api/users/

// route to get all users - for us to check / reference back
router.route("/getUsers").get(
    getUsers
);

// route to register user
router.route("/registerUser").post(
    registerUser
);

// route to login user
router.route("/loginUser").get(
    loginUser
);

// route to get current user
router.route("/getCurrentUser").get(
    validateToken, getCurrentUser
);

module.exports = router;