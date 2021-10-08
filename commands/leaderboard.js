module.exports = {
	name: 'leaderboard',
  description: 'Zeigt die reichsten Benutzer des Chili Netzwerkes.',
  aliases: ['levels'],
  guildOnly: true,
	execute(message) {  
    const {color} = require("../config.js")
    const Discord = require('discord.js');
    const Enmap = require('enmap');
    const chilicoin = new Enmap({ name: 'chilicoin' });

    if (message.guild) {

      chilicoin.fetchEverything()
      let sorted = chilicoin.array().sort((a, b) => b.kontostand - a.kontostand);
      let top10 = sorted.splice(0, 10);

      const leaderboard = new Discord.RichEmbed()
        .setTitle("Leaderboard")
        .setColor(color);

      for(let data of top10) {

        if (message.guild.member(data.user) && data.kontostand) {
          leaderboard.addField(message.guild.members.get(data.user).user.tag, `${data.kontostand} <:Chilicoin:695600523113660486>`);
        }

      }

      message.channel.send(leaderboard);
    }
  }
}