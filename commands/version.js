module.exports = {
	name: 'version',
	description: 'Zeigt die Version des Bot.',
  showInHelp: false,
  guildOnly: false,
	execute(message) {
    
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
		message.channel.send("Die aktuelle Bot Version: " + botVersion + ".");
	},
};