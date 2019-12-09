const mongoose = require("mongoose");
const { Schema } = mongoose;

const tutorSchema = new Schema(
  {
    charId: Number,
    charName: { type: String, unique: true, sparse: true },
    tutors: [ { discordId: String, discordName: String } ]
  }
);

module.exports = Tutors = mongoose.model("tutors", tutorSchema);
