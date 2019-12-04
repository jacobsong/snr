const Staff = require("../models/Staff");

module.exports = {
  name: "refresh",
  description: "Refreshes the name and avatar for the staff user",
  guildOnly: true,
  roleRequired: 1, // 0=None, 1=Mod, 2=Admin, 3=Co-Owner, 4=Owner
  charRequired: false,
  argsRequired: 0,
  mentionsRequired: 0,
  usage: undefined,
  async execute(msg, args) {
    const user = msg.author;

    try {
      const result = await Staff.updateOne(
        { discordId: user.id },
        { $set: { discordName: user.tag, discordAvatar: user.avatarURL } }
      );
      
      if (result.n === 0) {
        msg.reply("you are not added on the website");
        return;
      }
    } catch (e) {
      msg.reply("Database error");
      return;
    }

    msg.reply("refreshed your info on the website");
    return;
  },
};