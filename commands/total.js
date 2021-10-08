module.exports = {
	name: 'total',
  description: 'Zeigt die aktuelle Anzahl der Chilicoins im Umlauf.',
  aliases: ['gesamt'],
  guildOnly: false,
	execute(message) {
    const Enmap = require('enmap');
    const chilicoin = new Enmap({ name: 'chilicoin' });
    chilicoin.fetchEverything();
    let totalArray = [];
    for(const data of chilicoin.array()) {
        totalArray.push(data.kontostand); // Fügt data.kontostand zu dem Array hinzu.
        var totalNumber = totalArray.reduce(totalFunction) // Die Funktion rechnet alle Array Inhalte zusammen.
        function totalFunction(total, num) {
        return total + num;
  }
}
    message.channel.send("Es sind aktuell " + totalNumber + " <:Chilicoin:695600523113660486> im Umlauf.");
	},
};