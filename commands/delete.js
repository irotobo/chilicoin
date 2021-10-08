module.exports = {
	name: 'delete',
  description: 'Entfernt alle Chilicoins eines Chilicoin-Kontos.',
  showInHelp: false,
  guildOnly: true,
  privat: true,
  usage: "[@benutzer]/all",
	execute(message, args) {
    const Enmap = require('enmap');
    const chilicoin = new Enmap({ name: 'chilicoin' });

    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
        if (args[0].toLowerCase() === "all") {
            chilicoin.deleteAll(); // < Gesamten Inhalt löschen
            return message.channel.send("Alle vorhandenen Chilicoin-Kontos wurden entfernt.")
        } else {

        }
    } else {

    }
    if (user.bot || !user.id) return;
    const key = "chiliCoinId-" + user.id;
    chilicoin.ensure(key, {
        user: user.id,
        kontostand: 0
      });
        chilicoin.fetch(key);
        chilicoin.set(key, 0, "kontostand");
        message.channel.send("Das Chilicoin-Konto von " + user.tag + " wurde erfolgreich gelöscht.");
  },
};