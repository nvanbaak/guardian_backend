const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const userSchema = new Schema({
    email: {
        type: "string",
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        required: "Email is required!",
    },
    first_name: {
        type: "string",
        trim: true,
        required: "You need a first name!"
    },
    last_name: {
        type: "string",
        trim: true,
        required: "You need a last name!"
    },
    password: {
        type: "string",
        required: "How are you going to maintain security if you don't have a password?",
        validate: [({ length }) => length >= 8, "Please enter a password of length 8 or greater"]
    },
    position: {
        type: "string"
    },
    trips:[{
        type: Schema.Types.ObjectId,
        ref: "Trip"
    }]
});

// Model
const User = mongoose.model("User", userSchema);

module.exports = User;