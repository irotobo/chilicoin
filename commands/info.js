
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'info',
  description: 'Zeigt Informationen über den Chilicoin Bot.',
  showInHelp: false,
  guildOnly: false,
	execute(message) {
/*    
    const Enmap = require('enmap');
const myEnmap = new Enmap({ name: 'version' });

    var buildNumberEnmap = myEnmap.get('buildNumber');
var nextNumberEnmap = myEnmap.get("nextNumber")
if ((buildNumberEnmap > 999) && (buildNumberEnmap <= 9999)) {
  var botVersion = ("1." + nextNumberEnmap + "-" + buildNumberEnmap);
}
if ((buildNumberEnmap > 99) && (buildNumberEnmap <= 999)) {
  var botVersion = ("1." + nextNumberEnmap + "-0" + buildNumberEnmap);
}
if ((buildNumberEnmap > 9) && (buildNumberEnmap <= 99)) {
  var botVersion = ("1." + nextNumberEnmap + "-00" + buildNumberEnmap);
}
if ((buildNumberEnmap > 0) && (buildNumberEnmap <= 9)) {
  var botVersion = ("1." + nextNumberEnmap + "-000" + buildNumberEnmap);
}
    
		message.channel.send({embed: {
    color: 0xff1300,
    title: "**Informationen**",
    description: "Hier ist eine Liste von Informationen über den Bot.",
    fields: [{
        name: "Programmiert von:",
        value: "Robin.#9106"
      },
	  {
        name: "Programmiert für:",
        value: "Chili Netzwerk"
      },
	  {
        name: "Textsprache:",
        value: "Deutsch/German"
      },
	  {
        name: "Programmsprache:",
        value: "JavaScript"
      },
      {
        name: "Online seid:",
        value: "08.03.2019"
      },
      {
        name: "Version:",
        value: "" + botVersion + ""
      }
    ],
    timestamp: new Date(),
    footer: {
      //icon_url: client.user.avatarURL,
      text: "© Chili Netzwerk"
    }
  }
});*/
	},
};