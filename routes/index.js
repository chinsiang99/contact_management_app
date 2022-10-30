const { Router } = require("express");
const usersRoutes = require("./users.routes");
// const usersRoutes = require("./users.routes");

const router = Router();

router.use("/users/", usersRoutes);

module.exports = { router };