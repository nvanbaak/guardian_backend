const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const tripSchema = new Schema({
    city: {
        type: "string",
        required: "Please enter a city",
    },
    safety: {
        type: "number"
    },
    report_doc: {
        type: "string",
        required: "Your report needs content!"
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
        required: "Your itinerary needs at least one stop!"
    }
});

// Model
const Trp = mongoose.model("Trip", tripSchema);

module.exports = Trip;