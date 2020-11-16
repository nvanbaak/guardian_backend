// Dependencies
const router = require("express").Router();
const userRoutes = require("./users");
const teamRoutes = require("./teams");
const tripRoutes = require("./trips");

// Routes
router.use(userRoutes);
router.use(teamRoutes);
router.use(tripRoutes);

module.exports = router;