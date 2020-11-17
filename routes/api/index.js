// Dependencies
const router = require("express").Router();
const userRoutes = require("./users");
const tripRoutes = require("./trips");

// Routes
router.use(userRoutes);
router.use(tripRoutes);

module.exports = router;