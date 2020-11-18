const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const tripSchema = new Schema({
    city: {
        type: "string",
        required: "Please enter a city",
    },
    report_doc: {
        type: "string",
        // required: "Your report needs content!"
    },
    completed: {
        type: "boolean",
        default: false
    },
    start_date: {
        type: "Date",
        default: Date.now,
        required: "Please enter a start date!"
    },
    end_date: {
        type: "Date",
        default: Date.now,
        required: "Please enter an end date!"
    },
    itinerary: {
        type: "Array",
        // required: "Your itinerary needs at least one stop!"
    },
    users:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

// Model
const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;