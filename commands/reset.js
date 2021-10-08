module.exports = {
	name: 'reset',
	description: 'Startet den Bot neu.',
  aliases: ['start', 'restart', 'rst'],
  showInHelp: false,
  guildOnly: false,
  privat: true,
	execute(message) {
    return message.channel.send("Der Chilicoin Bot wird neugestartet...")
    .then(() => console.log("[" + module.exports.name + "] " + message.author.tag + " has stopped the bot..."))
    .then(() => process.exit());
  }
};