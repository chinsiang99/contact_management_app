const { Router } = require("express");
const userRoutes = require("./userRoutes");
const contactRoutes = require("./contactRoutes");

const router = Router();

router.use("/users/", userRoutes);
router.use("/contacts/", contactRoutes);

module.exports = { router };