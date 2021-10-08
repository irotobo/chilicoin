const Discord = require('discord.js');
module.exports = {
    name: 'shop',
	description: 'Erstellt eine Chilicoin-Shop Vorlage.',
    showInHelp: false,
    guildOnly: true,
    privat: true,
    execute(message) {
        message.delete();
        const {color} = require("../config.js")
        const chiliNetwork = message.guild
        const kleineChili = chiliNetwork.roles.get("463015106952036352")
        const chili = chiliNetwork.roles.get("463015757673005056")
        const großeChili = chiliNetwork.roles.get("463016419089580033")
        const superChili = chiliNetwork.roles.get("533582810041024522")
        const ultraChili = chiliNetwork.roles.get("463017006841724928")
        const premium = chiliNetwork.roles.get("650410630989479946")
        const shopStart = new Discord.RichEmbed()
            .setColor('#25252b')
            .setTitle("Shop")
            .setDescription("Reagiere mit dem Chilicoin <:Chilicoin:695600523113660486> um die Rolle mit dem angegebenem Preis zu kaufen.\n\nAchtung: Bei jedem Kauf werden alle Rollen die im Shop angeboten werden und bereits dem Käufer gehören, entfernt. Jeder Kauf ist unwiederruflich.")
            .addField("Vorteile:", kleineChili.toString() + "\nDer Nickname kann verändert werden.\n\n"
                + chili.toString() + "\nEs kann in Sprachkanälen gestreamt werden.\n\n"
                + großeChili.toString() + "\nEs können Emojis von anderen Servern genutzt werden. Außerdem wird der Zutritt zu den Lounges wird gewährt.\n\n"
                + superChili.toString() + "\nEs können Dateien in Textkanälen verschickt werden.\n\n"
                + ultraChili.toString() + "\nEs können Reaktionen hinzugefügt werden.\n\n"
                + "@Premium" + "\nDie beste, für Benutzer erreichbare Rolle!\n\n")
        function roleEmbedFunction(role, preis) {
        
            const roleEmbed = new Discord.RichEmbed()
                .setColor(color)
                if (role === premium) {
                    roleEmbed.addField("Rolle:", "@Premium");
                } else {
                    roleEmbed.addField("Rolle:", role.toString());
                }
                roleEmbed.addField("Preis:", preis + " <:Chilicoin:695600523113660486>");
            message.channel.send(roleEmbed).then(function (message) {
                message.react("695600523113660486")
            });
        }
        try {
            message.channel.send(shopStart);
            roleEmbedFunction(kleineChili, 10);
            roleEmbedFunction(chili, 25);
            roleEmbedFunction(großeChili, 50);
            roleEmbedFunction(superChili, 100);
            roleEmbedFunction(ultraChili, 175);
            roleEmbedFunction(premium, 500);
        } catch (error) {
            console.error("[shop] " + error);
        }
    }
}