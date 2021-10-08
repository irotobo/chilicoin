const fs = require("fs");
const Discord = require("discord.js");
const { prefix, color, token } = require("./config.js");
const { error, errorMessage } = require("./error.js");
const client = new Discord.Client();

//----Version----

const Enmap = require("enmap");
const myEnmap = new Enmap({ name: "version" });

myEnmap.defer.then(() => {
  console.log("[enmap] Version: " + myEnmap.size + " key(s) loaded");
  myEnmap.get("buildNumber");
  myEnmap.get("nextNumber");
  myEnmap.get("totalBuildNumber");
});
var startBuildNumberEnmap = myEnmap.get("buildNumber");
var buildNumberEnmap = startBuildNumberEnmap + 1; //    <--- nur für ready.on event!!!
var nextNumberEnmap = myEnmap.get("nextNumber");
if (buildNumberEnmap > 999 && buildNumberEnmap <= 9999) {
  var botVersion = "1." + nextNumberEnmap + "-" + buildNumberEnmap;
}
if (buildNumberEnmap > 99 && buildNumberEnmap <= 999) {
  var botVersion = "1." + nextNumberEnmap + "-0" + buildNumberEnmap;
}
if (buildNumberEnmap > 9 && buildNumberEnmap <= 99) {
  var botVersion = "1." + nextNumberEnmap + "-00" + buildNumberEnmap;
}
if (buildNumberEnmap > 0 && buildNumberEnmap <= 9) {
  var botVersion = "1." + nextNumberEnmap + "-000" + buildNumberEnmap;
}

//----Version-end----

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

// ERROR

const achtung = require("./achtung.js");

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.guildOnly && message.channel.type !== "text") {
    return error(
      message,
      `Du kannst diesen Befehl nicht in den Direktnachrichten ausführen.`
    );
  }

  if (command.privat && !(message.author.id === "414020799452807170")) {
    return error(message, errorMessage.permissionError);
  }

  if (command.args && !args.length) {
    error(message, errorMessage.argumentError);

    if (command.usage) {
      error(message, errorMessage.unknownError);
    }
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    error(message, errorMessage.unknownError);
  }
});

// Coins

const chilicoin = new Enmap({ name: "chilicoin" });

chilicoin.defer.then(() => {
  console.log("[enmap] Chilicoin: " + chilicoin.size + " key(s) loaded");
});

/*var newDate = new Date();
var Datum = newDate.getDate()+"."+(newDate.getMonth()+1)+"."+newDate.getFullYear();*/

/*client.on('guildMemberUpdate', (oldMember, newMember) => {
//const guild = newMember.guild;
});*/

client.on("guildMemberRemove", member => {
  const key = "chiliCoinId-" + member.id;
  if (chilicoin.has(key)) {
    chilicoin.delete(key);
  }
});

const cooldown = new Set();
const cooldownSeconds = 5;

client.on("message", message => {
  if (message.author.bot || !message.author.id) return;
  if (message.guild) {
    if (cooldown.has(message.author.id)) {
      return;
    } else {
      if (!message.content.startsWith(prefix)) {
        if (message.author.id !== "414020799452807170") {
          cooldown.add(message.author.id);

          setTimeout(() => {
            // entfernt benutzer nach cooldownSeconds(In Sekunden)
            cooldown.delete(message.author.id);
          }, cooldownSeconds * 1000);
        }

        const key = "chiliCoinId-" + message.author.id;
        chilicoin.ensure(key, {
          user: message.author.id,
          kontostand: 0
        });
        chilicoin.fetch(key);
        const chiliNetwork = client.guilds.get("463001893514248213");
        if (
          chiliNetwork
            .member(message.author.id)
            .roles.has(chiliNetwork.roles.get("701829043905101973").id)
        ) {
          chilicoin.math(key, "+", 2, "kontostand");
        } else {
          chilicoin.math(key, "+", 1, "kontostand");
        }
      }
    }
  }
});

let totalArray = [];
for (const data of chilicoin.array()) {
  totalArray.push(data.kontostand); // Fügt data.kontostand zu dem Array hinzu.
  var totalNumber = totalArray.reduce(totalFunction); // Die Funktion rechnet alle Array Inhalte zusammen.
  function totalFunction(total, num) {
    return total + num;
  }
}

const shopChannelId = "704258847795052544";

const kleineChiliMessage = "704263501526597682";
const chiliMessage = "704263502117994587";
const großeChiliMessage = "704263502319190019";
const superChiliMessage = "704263503317434369";
const ultraChiliMessage = "704263531532517406";
const premiumMessage = "704263532040159292";

client.on("ready", () => {
  function messageFetch(messageId) {
    client.guilds
      .get("463001893514248213")
      .channels.get(shopChannelId)
      .fetchMessage(messageId);
  }
  messageFetch(kleineChiliMessage); // kleineChili
  messageFetch(chiliMessage); // chili
  messageFetch(großeChiliMessage); // großeChili
  messageFetch(superChiliMessage); // superChili
  messageFetch(ultraChiliMessage); // ultraChili
  messageFetch(premiumMessage); // premium
});

client.on("messageReactionAdd", (reaction, user) => {
  let message = reaction.message;
  let emoji = reaction.emoji;
  const chiliNetwork = client.guilds.get("463001893514248213");
  if (user.bot || !user.id) return;
  if (reaction.message.channel.id === shopChannelId) {
    function rolesGet(roleId) {
      return chiliNetwork.roles.get(roleId);
    }
    const miniChili = rolesGet("463024248391467009");
    const kleineChili = rolesGet("463015106952036352");
    const chili = rolesGet("463015757673005056");
    const großeChili = rolesGet("463016419089580033");
    const superChili = rolesGet("533582810041024522");
    const ultraChili = rolesGet("463017006841724928");
    const premium = rolesGet("650410630989479946");

    if (emoji.id == "695600523113660486") {
      // Nur Chilicoin emoji
      const balance = "chiliCoinId-" + user.id;
      chilicoin.ensure(balance, {
        user: message.author.tag,
        kontostand: 0
      });
      const roleMember = chiliNetwork.member(user.id);

      function roleRemove(role) {
        if (roleMember.roles.has(role.id)) {
          roleMember.removeRole(role);
        }
      }

      function dmError(errorMessage, member) {
        class CustomError extends Error {
          constructor(message) {
            super(message);
            this.name = "Fehler";
          }
        }

        function customError(errorMessage) {
          throw new CustomError(errorMessage);
        }

        try {
          customError(errorMessage);
        } catch (e) {
          client.users
            .get(member.id)
            .send(`\`\`\`diff\n- ${member.tag} > ${e.message}\`\`\``);
        }
      }

      async function buyRole(messageId, preis, role) {
        if (message.id === messageId) {
          if (!roleMember.roles.has(role.id)) {
            if (chilicoin.get(balance, "kontostand") < preis) {
              dmError(`Du besitzt nicht genügend Chilicoins.`, user);
              // client.users.get(user.id).send("```" + achtung.language + user.tag + achtung.e11 + "\n```");
            } else if (chilicoin.get(balance, "kontostand") > preis) {
              try {
                roleRemove(miniChili);
                roleRemove(kleineChili);
                roleRemove(chili);
                roleRemove(großeChili);
                roleRemove(superChili);
                roleRemove(ultraChili);
                roleRemove(premium);
                roleMember.addRole(role);
              } catch (error) {}
              chilicoin.fetch(balance);
              chilicoin.math(balance, "sub", preis, "kontostand");
              const bestätigung = new Discord.RichEmbed()
                .setColor(color)
                .setTitle("Bestätigung")
                .setDescription(
                  "Du hast erfolgreich die Rolle " +
                    role.name +
                    " für " +
                    preis +
                    " <:Chilicoin:695600523113660486> gekauft."
                );
              client.users.get(user.id).send(bestätigung);
              chiliNetwork.channels
                .get("524274966057975819")
                .send(
                  "Shop: " +
                    user.tag +
                    " hat " +
                    role.toString() +
                    " für " +
                    preis +
                    " <:Chilicoin:695600523113660486> gekauft."
                );
            }
          } else if (roleMember.roles.has(role.id)) {
            dmError(`Du besitzt diese Rolle bereits.`, user);
            // client.users.get(user.id).send("```" + achtung.language + user.tag + achtung.e16 + "\n```");
          }
        }
      }

      //buyRole(message ID, Preis [als Number, nicht als String], Rolle)
      buyRole(kleineChiliMessage, 10, kleineChili);
      buyRole(chiliMessage, 25, chili);
      buyRole(großeChiliMessage, 50, großeChili);
      buyRole(superChiliMessage, 100, superChili);
      buyRole(ultraChiliMessage, 175, ultraChili);
      buyRole(premiumMessage, 500, premium);
    }
    reaction.remove(user);
  }
});

//-------------------------------- end of code-------------------------------------------------------------------------------------------------

client.on("ready", () => {
  myEnmap.math("buildNumber", "+", 1);
  myEnmap.math("totalBuildNumber", "+", 1);
  console.log("[chilicoin] Total: " + totalNumber);
  console.log("[start] Chili Bot startet with version " + botVersion);
  client.user.setStatus("online");
  client.user.setPresence({ game: { name: prefix + "help", type: 2 } });
  const startedEmbed = new Discord.RichEmbed()
    .setColor(color)
    .setAuthor(
      "Chili Bot started.",
      client.user.avatarURL,
      "https://chilicoin.glitch.me"
    )
    .setTitle(botVersion)
    .setTimestamp()
    .setFooter("© Chili Network");
  //client.channels.get("554690020854988800").send(startedEmbed);
});

//--------------

client.login(process.env.TOKEN);

var http = require("http");
http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      '<link rel="shortcut icon" type="image/x-icon" href="https://cdn.discordapp.com/attachments/588750489370361876/695711361434648686/Chilicoin_4.png">'
    );
    res.write(
      "<style> *{font-family: sans-serif; margin: auto; text-align: center; background-color: #303136; color: white;}</style>"
    );
    res.write(
      '<img src="https://cdn.discordapp.com/attachments/588750489370361876/695711361434648686/Chilicoin_4.png" alt="Chilicoin" style="margin-top:200px;width:100px;height:100px;">'
    );
    res.write('<h1 style="margin-top: 20px;">Chilicoin');
    res.write("</h1>");
    res.write("<p1>Wert der Chilicoins im Umlauf: " + totalNumber);
    res.write("</p1>");
    res.end();
  })
  .listen(process.env.PORT);

/*require('http').createServer(function(request, response) {
  response.end("Wert der Chilicoins im Umlauf: " + totalNumber);
}).listen(process.env.PORT);*/
