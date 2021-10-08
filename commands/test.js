module.exports = {
	name: 'test',
    description: 'Allgemeiner Test-Befehl',
    showInHelp: false,
    guildOnly: false,
    privat: true,
    execute(message) { 
        const { error, errorMessage } = require("../error.js");
        
        if (message.author) {
            error(message, "Funktioniert.");
        }

    }
}