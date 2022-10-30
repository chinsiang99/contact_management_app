const { Router } = require("express");
const userRoutes = require("./userRoutes");
const contactRoutes = require("./contactRoutes");

const router = Router();

router.use("/user/", userRoutes);
router.use("/contact/", contactRoutes);

module.exports = { router };