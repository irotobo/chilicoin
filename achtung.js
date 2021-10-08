const start = " > "

const achtung = {
    "language": "diff\n- ",
    "e1": start + "Du besitzt nicht die benötigten Berechtigungen, um diesen Befehl auszuführen.", // no Permission
    "e2": start + "Es ist ein unbekannter Fehler aufgetreten.", // unknown Error
    "e3": start + "Du hast kein gültiges Argument angegeben.", // no Argument
    "e4": start + "Du darfst keine Werbung versenden.", // no Advertising permission
    "e5": start + "Du kannst die Musik nicht selbst auswählen.", // no Music Permission
    "e6": start + "Du kannst diesen Befehl nicht in den Direktnachrichten ausführen.", // no DM Permission
    "e7": start + "Dir konnte keine Direktnachricht gesendet werden.", // cant send DM
    "e8": start + "Dieser Befehl existiert nicht.", // unknown Command
    "e9": start + "Dieser Prefix kann nicht genutzt werden. Nutze = um eine Antwort zu erhalten.", // unknown Prefix
    "e10a": start + "Du darfst", // You can use - part 1
    "e10b": "nicht benutzen.", // You cant use - part 2
    "e11": start + "Du besitzt nicht genügend Chilicoins.",
    "e12": start + "Du musst mindestens einen Chilicoin übertragen.",
    "e13": start + "Du kannst maximal 100.000 Chilicoins übertragen.",
    "e14": start + "Du kannst keine Chilicoins an Bots übertragen.",
    "e15": start + "Du kannst keine Chilicoins an dich selbst übertragen.",
    "e16": start + "Du besitzt diese Rolle bereits."
  }
  
  module.exports = achtung;