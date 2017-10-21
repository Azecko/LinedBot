const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "MzcxMzM1NjY0MDg5Njk0MjA5.DM0LWw.7QGCGsG65Fb0d2ozQyuHHPJSivc";
const PREFIX = "L-";

const modrole = "Modérateur";

var client = new Discord.Client();

function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function roll() {
   return Math.floor(Math.random() * 99999) + 1;
}

var roll = Math.floor(Math.random() * 99999) + 1;

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = [
    "Oui.",
    "Non.",
    "Sûrment.",
    "Je ne pense pas.",
    "T'es malade ou quoi ? Jamais mec.",
    "Aspèrge",
    "Je sais pas.",
    "Pourquoi tu me demandes ça ?"
];

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function () {
    console.log("LinedBot ready !");
    bot.user.setGame("L-help")
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "bienvenue_aurevoir").sendMessage(member.toString() + " bienvenue à bord batard")

    member.addRole(member.guild.roles.find("name", "⚓ MEMBRE"));
});

bot.on("guildMemberRemove", function(member) {
    member.guild.channels.find("name", "bienvenue_aurevoir").sendMessage(member.toString() + " aurevoir Batard")
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (message.content == "A quoi sert le Sonic Bot ?") {
        message.channel.sendMessage("J'ai été créé par Azecko car il s'ennuyait, tu peux faire _help pour savoir à quoi je sers.");
    }

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args.slice(1).join(" ");

    var user = message.mentions.users.first();

    var guild = message.guild;

    var member = message.member;

    var rolemodo = member.guild.roles.find("name", "Modérateur")

    var rolefriend = member.guild.roles.find("name", "Friend")

    var roleyoutube = member.guild.roles.find("name", "Youtube")

    var rolemute = member.guild.roles.find("name", "Mute")

    var modlog = member.guild.channels.find("name", "mod-log")

    var midlemanrole = member.guild.roles.find("name", "Midleman")

    var regleschannel = member.guild.channels.find("name", "general")

    var cont = message.content.slice(PREFIX.length).split(" ");

    var args3 = cont.slice(1);
    switch (args[0].toLowerCase()) {
        case "unmute":
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Tu n'as pas la permission.");
        if(!modlog) return message.reply("Je ne trouve pas de channel mod-log.");
        var member = message.mentions.members.first();
        if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser qui je dois unmute.")
        member.removeRole(rolemute)
        message.channel.sendMessage("Il a bien été unmute")

        var embed = new Discord.RichEmbed()
        .addField("Action :", "Unmute")
        .addField("Utilisateur :", user.username)
        .addField("Modérateur :", message.author.username)
        .setColor(0x808000)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        member.guild.channels.find("name", "mod-log").sendEmbed(embed);
        break;
        case "mute":
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Tu n'as pas la permission.");
        if(!modlog) return message.reply("Je ne trouve pas de channel mod-log.");
        var member = message.mentions.members.first();
        if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser qui je dois Mute.")
        member.addRole(rolemute)
        message.channel.sendMessage("Il a bien reçu son mute.")

        var embed = new Discord.RichEmbed()
        .addField("Action :", "Mute")
        .addField("Utilisateur :", user.username)
        .addField("Modérateur :", message.author.username)
        .setColor(0x808000)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        member.guild.channels.find("name", "mod-log").sendEmbed(embed);
        break;
        case "8ball":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Je crois que tu as oublié de mettre une question.");
            break;
        case "help":
            var embed = new Discord.RichEmbed()
                .addField("L-ban", "Commande réservée aux administrateurs/modérateurs, permet de bannir un utilisateur. Fonction : L-ban [utilisateur] [raison]")
                .addField("L-kick", "Commande réservée aux administrateurs/modérateurs, permet de kick un utilisateur. Fonction : L-kick [utilisateur] [raison]")
                .addField("L-purge", "Commande réservée aux administrateurs/modérateurs, permet de supprimer un certain nombres de messages. Fonction : L-purge [nombre]")
                .addField("L-mute", "Commande réservée aux administrateurs/modérateurs, permet de mute un utilisateur. Fonction : L-mute [utilisateur]")
                .addField("L-unmute", "Commande réservée aux administrateurs/modérateurs, permer d'unmute un utilisateur. Fonction : L-unmute [utilisateur]")
                .addField("L-help", "Pour voir les commandes du bot.")
                .addField("L-8ball", "Pose une question, au bot. N'oublie pas d'inclure ta question après la commande.")
                .addField("L-userinfo", "Pour avoir des informations sur un utilisateur. Fonction : L-userinfo [utilisateur]")
                .addField("L-photo", "Pour voir la photo de profil d'un utilisateur. Fonction : L-photo [utilisateur]")
                .addField("L-serverinfo", "info sur le serveur sur le quel tu te trouves.")
                .addField("L-roll", "Un nombre aléatoire !")
                .setColor(0x800040)
                .setFooter("Merci d'utiliser le Lined Bot.", message.author.avatarURL)
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Les commandes du bot :")
                .setTimestamp()
            member.sendEmbed(embed);
            message.react("✅")
            message.channel.sendMessage(member.toString() + " Je t'ai envoyé les commandes en MP !")
            break;
        case "userinfo":
            if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser de qui je dois montrer les informations.")
            var embed = new Discord.RichEmbed()
                .addField("Pseudo", user.username)
                .addField("Ashtag", user.discriminator)
                .addField("ID", user.id)
                .addField("Compte créer le", user.createdAt)
                .setThumbnail(user.avatarURL)
                .setColor(0xff80ff)
                .setAuthor(message.author.username, message.author.avatarURL)
                .setFooter("Voilà.", message.author.avatarURL)
                .setTimestamp()
            message.channel.sendEmbed(embed);
            break;
        case "photo":
            if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser de qui je dois montrer la photo de profil.")
            message.channel.sendMessage(user.avatarURL)
            break;
        case "video":
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("Tu n'as pas la permission.");
            var embed = new Discord.RichEmbed()
            .addField("Voilà sa nouvelle vidéo !", (suffix))
            .setColor(generateHex())
            .setAuthor("Lined Bot", "https://image.noelshack.com/fichiers/2017/40/2/1507027500-sans-titre-1.png")
            .setFooter("N'oublie pas le like, le commentaire, et de t'abonner.")
            .setDescription("Nouvelle vidéo sur la chaîne de Lined !")
            .setTimestamp()
            message.delete()
        message.channel.sendEmbed(embed);
            break;
        case "say":
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("Tu n'as pas la permission.");
            message.channel.sendMessage(suffix)
            message.react("😮")
            console.log("Say message envoyé !")
            break;
        case "kick":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu n'as pas la permission.");
            if(!modlog) return message.reply("Je ne trouve pas de channel mod-log.");
            if (reason.length < 1) return message.reply("Tu as oublié la raison.");
            if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser qui je dois kick.")
            message.guild.member(user).kick();

            var embed = new Discord.RichEmbed()
            .addField("Action :", "kick")
            .addField("Utilisateur :", user.username)
            .addField("Modérateur :", message.author.username)
            .setColor(0x800000)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "mod-log").sendEmbed(embed);
            message.react(":poop:")
            break;
        case "ban":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Tu n'as pas la permission.");
            if(!modlog) return message.reply("Je ne trouve pas de channel mod-log.");
            if (reason.length < 1) return message.reply("Tu as oublié la raison.");
            if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser qui je dois bannir.")
            message.guild.ban(user, 2);

            var embed = new Discord.RichEmbed()
            .addField("Action :", "ban")
            .addField("Utilisateur :", user.username)
            .addField("Modérateur :", message.author.username)
            .setColor(0x0000ff)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "mod-log").sendEmbed(embed);
            break;
        case "purge":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Tu n'as pas la permission.");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));

            var embed = new Discord.RichEmbed()
            .addField("Action :", "supression de messages")
            .addField("Modérateur :", message.author.username)
            .addField("Nombre de messages :", messagecount)
            .setColor(0x0000ff)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "mod-log").sendEmbed(embed);
            break;
        case "serverinfo":
            var embed = new Discord.RichEmbed()
            .setAuthor("informations sur le serveur " + message.guild.name)
            .setThumbnail(message.guild.iconURL)
            .setFooter(message.guild.owner.user.tag, message.guild.owner.user.avatarURL)
            .addField("Membres", message.guild.memberCount)
            .addField("Channels", message.guild.channels.filter(chan => chan.type === "voice").size + " channels vocaux " + message.guild.channels.filter(chan => chan.type === "text").size + " channels textuels")
            .addField("Roles", message.guild.roles.map(role => role.name).join(", "))
            message.channel.sendEmbed(embed)
            break;
        case "roll":
        function roll() {
            return Math.floor(Math.random() * 99999) + 1;
         }
3
            var embed = new Discord.RichEmbed()
            .addField("Tu as roll :", roll())
            .setTimestamp()
            .setAuthor(message.author.username, message.author.avatarURL)
            message.channel.sendEmbed(embed)
            break;
            default:
            message.channel.sendMessage("Commande invalide ^^")
    }
});

bot.login(TOKEN);