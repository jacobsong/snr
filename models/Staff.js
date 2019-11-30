const mongoose = require("mongoose");
const { Schema } = mongoose;

const staffSchema = new Schema(
  {
    discordId: { type: String, unique: true, index: true },
    discordName: String,
    discordAvatar: String,
    roleCd: Number
  }
);

module.exports = Staff = mongoose.model("staff", staffSchema);
