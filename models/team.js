const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema 
const teamSchema = new Schema({
    team_name: {
        type: "string",
        required: "Team name is required"
    },
    members: {
        array: ["member1", "member2", "member3"]
    },
    team_color: {
        type: "string"
    }
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team