module.exports = {
	name: 'geld',
  description: 'Zeigt deinen aktuellen Kontostand.',
  aliases: ['bal', 'balance', 'kontostand', 'konto', 'rank'],
  guildOnly: false,
	execute(message) {  
    const Discord = require('discord.js');
    const Enmap = require('enmap');
    const {color} = require("../config.js")
    const chilicoin = new Enmap({ name: 'chilicoin' });

    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }
    if (user.bot || !user.id) return;

    const key = "chiliCoinId-" + user.id;
    chilicoin.ensure(key, {
      user: user.id,
      kontostand: 0
    });

    chilicoin.fetch(key);
    
    const kontostandEnmap = new Discord.RichEmbed()
    .setColor(color)
    .setTitle(user.tag)
    .addField('Kontostand:', chilicoin.get(key, "kontostand") + ' <:Chilicoin:695600523113660486>')
	  .setTimestamp()
    .setFooter("© Chili Network");
    /*function roleHas(roleId) {
      if (message.guild.member(message.author.id).roles.has(roleId)) {
        kontostandEnmap.addField() // vllt.: if kontostandEnmap Field exist  
      }
    }*/
    message.channel.send(kontostandEnmap);
  },
};