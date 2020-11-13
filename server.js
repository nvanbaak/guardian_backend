// Express boilerplate
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9164;

// Auth
const dotenv = require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/guardiandb")

// Routes
const routes = require("./routes");
app.use(routes);

// Listener function
app.listen(PORT, function() {
    console.log('Listening on PORT ' + PORT);
});