const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema 
const teamSchema = new Schema({
    team_name: {
        type: "string",
        required: "Team name is required"
    },
    members: {
        type: "array"
    },
    team_color: {
        type: "string"
    }
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team