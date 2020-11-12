// Dependencies
const router = require("express").Router();
const userRoutes = require("./users");
const teamRoutes = require("./teams");
const tripRoutes = require("./trips");

// Routes
router.use("/users", userRoutes);
// router.use("./teams", teamRoutes);
// router.use("./trips", tripRoutes);

module.exports = router;