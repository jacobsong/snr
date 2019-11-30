const Discord = require("discord.js");
const chars = require("../services/chars");

module.exports = {
  name: 'characters',
  description: 'List all valid character names',
  guildOnly: false,
  roleRequired: 0, // 0=None, 1=Mod, 2=Admin, 3=Co-Owner, 4=Owner
  charRequired: false,
  argsRequired: 0,
  mentionsRequired: 0,
  usage: undefined,
  execute(msg, args) {
    const embed = new Discord.RichEmbed();

    embed.setTitle("Valid character names");
    embed.setColor("PURPLE");
    embed.setDescription(`${chars.join("\n")}`);
    msg.author.send(embed)
      .then(() => {
        if (msg.channel.type === 'dm') return;
        msg.reply("I sent you a DM with all valid character names");
      })
      .catch(error => {
        msg.reply("failed to send you a DM.  Do you have DMs disabled?");
      });

    return;
  },
};