const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "List all of my commands",
  guildOnly: false,
  roleRequired: 0, // 0=None, 1=Mod, 2=Admin, 3=Co-Owner, 4=Owner
  charRequired: false,
  argsRequired: 0,
  mentionsRequired: 0,
  usage: undefined,
  execute(msg, args) {
    const { commands } = msg.client;
    const embed = new Discord.RichEmbed();

    embed.setTitle("Command List");
    embed.setColor("BLUE");
    commands.map(command => {
      const argsList = (command.usage != undefined) ? `*${command.usage}*` : "";
      embed.addField(`**${command.name}** ${argsList}`, ` - ${command.description}`);
    });

    msg.author.send(embed)
      .then(() => {
        if (msg.channel.type === 'dm') return;
        msg.reply("I sent you a DM with all my commands");
      })
      .catch(error => {
        msg.reply("failed to send you a DM.  Do you have DMs disabled?");
      });

    return;
  },
};