/*
Usage:
const { error, errorMessage } = require("../error.js");

(Inside discord.js message event):
error(message, `Error Message...` / errorMessage.unknownError);
*/

const Discord = require('discord.js');
const client = new Discord.Client()

function error(message, errorMessage) {

    class CustomError extends Error {
        constructor(message) {
            super(message); // Error message: catch(err) {err.message}
            this.name = "Fehler"; // Error name: catch(err) {err.name}
                // Error stack: catch(err) {err.stack}
        }
    }

    function customError(errorMessage) {
        throw new CustomError(errorMessage);
    }
  
    try {
        customError(errorMessage)
    } catch(e) {
        message.channel.send(`\`\`\`diff\n- ${message.author.tag} > ${e.message}\`\`\``);
    }
}

const errorMessage = {
    "unknownError": "Ein unbekannter Fehler ist aufgetreten.",
    "permissionError": "Du besitzt nicht die benötigten Berechtigungen, um diesen Befehl auszuführen.",
    "argumentError": "Du hast kein gültiges Argument angegeben.",
}

module.exports = { error, errorMessage }; 

// ES6 (not working): export default error;