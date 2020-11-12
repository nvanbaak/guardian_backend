// Dependencies
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API
router.use("/api", apiRoutes);

module.exports = router;