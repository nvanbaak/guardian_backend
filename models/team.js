const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema 
const teamSchema = new Schema({
    teamName: {
        type: "string",
        required: "Team name is required"
    },
    teamMembers: {
        array: ["member1", "member2", "member3"]
    },
    teamColor: {
        type: "string"
    }
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team