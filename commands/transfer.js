module.exports = {
	name: 'transfer',
  description: 'Zieht einen bestimmten Betrag von deinem Kontastand ab und gibt ihn einem anderen Mitglied.',
  //aliases: ['überweisen', 'send'],
	usage: '[@user] [betrag]',
  guildOnly: true,
	execute(message, args) {
    const Discord = require('discord.js');
    const Enmap = require('enmap');
    const chilicoin = new Enmap({ name: 'chilicoin' });
    const { error, errorMessage } = require("../error.js");
    const ceo = message.guild.roles.find(role => role.name === "CEO");

    if (!args.length) { // keine Argumente
      return error(message, errorMessage.argumentError);
    }

    chilicoin.fetchEverything();

    var betrag = parseInt(args[1], 10);
    
    let user;
    if (message.mentions.users.first()) {
    user = message.mentions.users.first();
    } else {
      return error(message, errorMessage.argumentError);
    }

    if (user.bot || !user.id) {
      return error(message, `Du kannst Chilicoins nicht an Bots übertragen.`);
    }

    
  if(!chilicoin.get("chiliCoinId-" + user.id)) {
    chilicoin.set("chiliCoinId-" + user.id, {
      user: user.id,
      kontostand: 0
    });
  }
    
    if (isNaN(betrag)) {
      return error(message, errorMessage.argumentError);
    }
    
    if (betrag <= 0 && !message.member.roles.has(ceo.id)) {
      return error(message, `Du musst mindestens einen Chilicoin übertragen.`);
    }
    
    if (betrag > 100000) {
      return error(message, `Du kannst maximal 100.000 Chilicoins übertragen.`);
    }

  const coinsOut = "chiliCoinId-" + message.author.id;
  const coinsIn = "chiliCoinId-" + user.id;

  if (coinsOut === coinsIn && !message.member.roles.has(ceo.id)) {
    return error(message, `Du kannst Chilicoins nicht an dich selbst übertragen.`);
  }

  if (betrag > chilicoin.get(coinsOut, "kontostand")  && !message.member.roles.has(ceo.id)) {
    return error(message, `Du besitzt nicht genügend Chilicoins.`);
  }
  
  if (!message.member.roles.has(ceo.id)) {
    chilicoin.math(coinsOut, "sub", betrag, "kontostand"); // Geld wird entfernt
  }
  if (!message.member.roles.has(ceo.id) || message.member.roles.has(ceo.id) && betrag <= 0 || message.member.roles.has(ceo.id)) {
    chilicoin.math(coinsIn, "add", betrag, "kontostand"); // Geld wird hinzugefügt
  }
   const checkEmbed = new Discord.RichEmbed()
    .setTitle("Transfer-Bestätigung")
    .setColor("#ff1300")
    .addField("Auftragsgeber:", message.author.tag)
    .addField("Empfänger:", user.tag)
    .addField("Betrag:", betrag)
    .setTimestamp();
  message.channel.send(checkEmbed);
   },
};