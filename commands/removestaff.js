const Staff = require("../models/Staff");

module.exports = {
  name: "removestaff",
  description: "Removes a staff member from the SnR website",
  guildOnly: true,
  roleRequired: 3, // 0=None, 1=Mod, 2=Admin, 3=Co-Owner, 4=Owner
  charRequired: false,
  argsRequired: 1,
  mentionsRequired: 1,
  usage: "<user>",
  async execute(msg, args) {
    const staff = msg.mentions.users.first();
    let sendMsg = "could not find that staff member in the database";

    try {
      const result = await Staff.deleteOne({ discordId: staff.id });

      if (result.deletedCount) {
        sendMsg = `removed ${staff.tag} from the staff page`;
      }

    } catch (e) {
      msg.reply("Database error");
      return;
    }

    msg.reply(sendMsg);
    return;
  },
};
