const mongoose = require("mongoose");
const { Schema } = mongoose;

const tutorSchema = new Schema(
  {
    charName: { type: String, unique: true, sparse: true },
    tutors: [ String ]
  }
);

module.exports = Tutors = mongoose.model("tutors", tutorSchema);
