const Tutors = require("../models/Tutors");
const chars = require("../services/chars");

module.exports = {
  name: "addtutor",
  description: "Adds a tutor to the SnR website, use `characters` command to list valid names",
  guildOnly: true,
  roleRequired: 1, // 0=None, 1=Mod, 2=Admin, 3=Co-Owner, 4=Owner
  charRequired: true,
  argsRequired: 2,
  mentionsRequired: 1,
  usage: "<user> <character>",
  async execute(msg, args) {
    const re = /<@/;
    const tutor = msg.mentions.users.first();
    const character = args.filter(arg => !re.test(arg));

    try {
      const alreadyExists = await Tutors.find(
        { charName: character[0], tutors: { $elemMatch: { discordId: tutor.id } } }
      ).limit(1);

      if (alreadyExists.length > 0) {
        msg.reply(`${tutor.tag} is already a tutor for ${character[0]}`);
        return;
      }

      await Tutors.updateOne(
        { charId: chars.indexOf(character[0]) + 1, charName: character[0] },
        { $push: { tutors: { discordId: tutor.id, discordName: tutor.tag } } },
        { upsert: true });
    } catch (e) {
      msg.reply("Database error");
      return;
    }

    msg.reply(`added ${tutor.tag} as a tutor for ${character[0]}`);
    return;
  },
};