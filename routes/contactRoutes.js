const { Router } = require("express");
const validateToken = require("../middleware/validateTokenHandler");

const router = Router();

// define routes after the "/contacts/" prefix
// api/contacts/

router.use(validateToken);

router.route("/").get((req, res, next) => {
    res.json({
        text: "hello there"
    })
})

module.exports = router;