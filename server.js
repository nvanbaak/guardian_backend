// Express boilerplate
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9164;

const mongoose = require("mongoose");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Routes
// const routes = require("./routes");
// app.use(routes);

// MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/guardiandb")

// Listener function
app.listen(PORT, function() {
    console.log('Listening on PORT ' + PORT);
});