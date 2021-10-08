module.exports = {
	name: 'ping',
	description: 'Zeigt den aktuellen Ping des Bot',
  guildOnly: false,
	execute(message) {
		message.channel.send("Der Ping des Bots liegt bei `" + `${Date.now() - message.createdTimestamp}` + " ms`.");
	},
};