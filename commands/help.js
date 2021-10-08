const { prefix } = require('../config.js');

module.exports = {
	name: 'help',
	description: "Zeigt Informationen über alle Befehle des Chili Netzwerkes. ",
	aliases: ['commands', "hilfe", "befehle"],
	usage: '[Befehl]',
	execute(message, args) {
		const Discord = require('discord.js');
		const { error, errorMessage } = require("../error.js");
		const { commands } = message.client;
		
		const helpEmbed = new Discord.RichEmbed()
    		.setColor("#ff1300")
			.setTitle("Hilfe")

		if (!args.length) {
			const commandMap = commands.filter(command => command.showInHelp != false).map(command => command.name).join('\n')
			helpEmbed.setDescription("Die folgende Liste zeigt die Befehle des Chili Bots.\nNutze =help [Befehl] um genauere Informationen zu einem Befehl zu erhalten.")
    		helpEmbed.addField("Befehle:", commandMap)
			if (message.channel.type === "dm") {
				try {
					return message.author.send(helpEmbed);
				} catch(error) {
					error(message, `Dir konnte keine Direktnachricht gesendet werden.`);
				}
			} else if (message.channel.type === "text") {
				return message.channel.send(helpEmbed);
			} else {
				error(message, errorMessage.unknownError);
			}

		} else if (args.length) {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
			if (!command) {
				return error(message, `Dieser Befehl existiert nicht.`);
			} else if (command) {
				helpEmbed.addField("Befehl:", prefix + command.name);
				if (command.aliases) {
					helpEmbed.addField("Aliases:", command.aliases.join(", "));
				}
				if (command.description) {
					helpEmbed.addField("Beschreibung:", command.description);
				}
				if (command.privat) {
					helpEmbed.addField("Berechtigung:", "Dieser Befehl benötigt eine Administrator-Berechtigung.");
				}
				if (command.usage) {
					helpEmbed.addField("Nutzung:", prefix + command.name + " " + command.usage);
				}
				if (message.channel.type === "dm") {
					try {
						return message.author.send(helpEmbed);
					} catch(error) {
						error(message, `Dir konnte keine Direktnachricht gesendet werden.`);
					}
				} else if (message.channel.type === "text") {
					return message.channel.send(helpEmbed);
				} else {
					error(message, errorMessage.unknownError);
				}
			} else {
				return error(message, errorMessage.unknownError);
			}
		}
	},
};



/*const { prefix } = require('../config.js');

module.exports = {
	name: 'help',
	description: "Zeigt eine Liste von allen Befehlen",
	aliases: ['commands', "hilfe", "befehle"],
	usage: '[Befehl]',
	execute(message, args) {
		const achtung = require("../achtung.js");
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push("Hier ist eine Liste von allen Befehlen:");
			data.push(commands.filter(command => command.showInHelp != false).map(command => command.name).join(', '));
			data.push("\nNutze \"" + prefix + "help [Befehl]\" Um genauere Informationen zu erhalten");

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.channel.send("Ich habe dir eine Nachricht mit allen Befehlen geschrieben.");
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.channel.send("```" + achtung.language + message.author.tag + achtung.e7 + "\n```");
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.channel.send("```" + achtung.language + message.author.tag + achtung.e8 + "\n```");
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Andere Namen:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Beschreibung:** ${command.description}`);
		if (command.usage) data.push(`**Nutzung:** ${prefix}${command.name} ${command.usage}`);

		message.channel.send(data, { split: true });
	},
};*/