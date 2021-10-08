module.exports = {
	name: 'builds',
	description: 'Zeigt, wie oft der Bot resetet wurde',
	showInHelp: false,  
	guildOnly: false,
	execute(message) {
        const Enmap = require('enmap');
		const myEnmap = new Enmap({ name: 'version' });

    	var totalBuildNumber = myEnmap.get('totalBuildNumber');
		message.channel.send("Der Bot wurde " + totalBuildNumber + " mal resetet.");
	},
};