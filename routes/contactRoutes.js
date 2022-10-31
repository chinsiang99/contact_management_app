const { Router } = require("express");

const router = Router();

// define routes after the "/contacts/" prefix
// api/contacts/

router.route("/").get((req, res, next) => {
    res.json({
        text: "hello there"
    })
})

module.exports = router;