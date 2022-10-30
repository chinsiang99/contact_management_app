const { Router } = require("express");

const router = Router();

// define routes after the "/users/" prefix
// api/users/

// router.route("/").get(
//     isAuthenticated, getUsers
// );

// router.route("/panic").get(
//     panic
// );

// router.route("/").get((req, res, next)=>
//     res.json({
//     text: "hello there"
// })
// )

// endpoint starts with api/user/

router.route("/").get((req, res, next) => {
    res.json({
        text: "hello there"
    })
})

module.exports = router;