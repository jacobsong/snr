const Staff = require("../models/Staff");
const validRoles = require("../services/validRoles");

module.exports = {
  name: "addstaff",
  description: "Adds a staff member to the SnR website",
  guildOnly: true,
  roleRequired: 3, // 0=None, 1=Mod, 2=Admin, 3=Co-Owner, 4=Owner
  charRequired: false,
  argsRequired: 1,
  mentionsRequired: 1,
  usage: "<user>",
  async execute(msg, args) {
    const staff = msg.mentions.users.first();
    let userRoleCd;

    msg.mentions.members.first().roles.some((role) => { 
      if (role.name in validRoles) {
        userRoleCd = validRoles[role.name];
      }
    });

    if (userRoleCd === undefined) {
      msg.reply(`${staff.tag} doesn't have one of these roles: [Mod, Admin, Co Owner, Owner]`);
      return;
    }

    try {
      const alreadyExists = await Staff.find({ discordId: staff.id }).limit(1);

      if (alreadyExists.length) {
        msg.reply("That member is already added");
        return;
      }

      await new Staff({
        discordId: staff.id,
        discordName: staff.tag,
        discordAvatar: staff.avatarURL,
        roleCd: userRoleCd
      }).save();

    } catch {
      msg.reply("Database error");
      return;
    }

    msg.reply(`added ${staff.tag} to the staff page`);
    return;
  },
};