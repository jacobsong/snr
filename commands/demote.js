const Staff = require("../models/Staff");

module.exports = {
  name: "demote",
  description: "Demotes the staff user",
  guildOnly: true,
  roleRequired: 3, // 0=None, 1=Mod, 2=Admin, 3=Co-Owner, 4=Owner
  charRequired: false,
  argsRequired: 1,
  mentionsRequired: 1,
  usage: "<user>",
  async execute(msg, args) {
    const staff = msg.mentions.users.first();

    try {
      const result = await Staff.find({ discordId: staff.id }).limit(1);

      if (result.length === 0) {
        msg.reply("that member is not added on the website");
        return;
      }

      const oldRoleCd = result[0].roleCd;

      if (oldRoleCd < 2) {
        msg.reply("that member cannot be demoted any fruther");
        return;
      }

      await Staff.updateOne(
          { discordId: staff.id },
          { $inc: { roleCd: -1 } }
      );
    } catch {
      msg.reply("Database error");
      return;
    }

    msg.reply(`${staff.tag} has been demoted`);
    return;
  },
};