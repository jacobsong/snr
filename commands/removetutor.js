const Tutors = require("../models/Tutors");

module.exports = {
  name: "removetutor",
  description: "Removes a tutor from the SnR website, use `characters` command to list valid names",
  guildOnly: true,
  roleRequired: 2, // 0=None, 1=Mod, 2=Admin, 3=Co-Owner, 4=Owner
  charRequired: true,
  argsRequired: 2,
  mentionsRequired: 1,
  usage: "<user> <character>",
  async execute(msg, args) {
    const re = /<@/;
    const tutor = msg.mentions.users.first();
    const character = args.filter(arg => !re.test(arg));
    let sendMsg = "could not find that tutor in the database";

    try {
      const result = await Tutors.updateOne(
        { charName: character[0] },
        { $pull: { tutors: { discordId: tutor.id } } },
      );

      if (result.nModified) {
        sendMsg = `removed ${tutor.tag} as a tutor for ${character[0]}`;
      }

    } catch (e) {
      msg.reply("Database error");
      return;
    }

    msg.reply(sendMsg);
    return;
  },
};