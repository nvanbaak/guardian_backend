// Dependencies
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API
router.use("/api", apiRoutes);
router.route("/").get((req, res) => {
    res.send("../index.html");
})

module.exports = router;