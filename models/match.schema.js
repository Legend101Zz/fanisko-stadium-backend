const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  MatchId: {
    type: String,
  },
});

module.exports = mongoose.model("Match", MatchSchema);
