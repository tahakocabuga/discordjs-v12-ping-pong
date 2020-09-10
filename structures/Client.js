const { Collection, Client, MessageEmbed } = require('discord.js');
const TimeoutManager = require('./Timeout');
const Giveaway = require('./Giveaway');
class GiveawayClient extends Client {
    constructor() {
        super();
        this.giveaways = new Collection();
        this.commands = new Collection();
        this.ms = require('ms');
        this.fs = require('fs');
        this.path = require('path');
        this.discord = require('discord.js');
        this.TimeoutManager = new TimeoutManager();
        this.Giveaway = Giveaway;
    }
    commandHandler(path) {
        this.fs.readdirSync(this.path.join(__dirname, `..`, path)).map((f) => {
            let File = require(this.path.join(__dirname, `..`, path, f));
            this.commands.set(File.name, File)
        })
    };
    start(token, path) {
        this.commandHandler(path);
        this.login(token);
        this.on('ready', () => {
            console.log(`${this.user.username} online oldu!`);
        });
        this.on('message', async(message) => {
            if(message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(`g!`)) return;
            const args = message.content.slice(`g!`.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if(this.commands.has(cmd)) this.commands.get(cmd).run(this, message, args).catch(console.error);
        });
    }
    embed(data, message) {
        return new MessageEmbed(data).setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    }
}
module.exports = GiveawayClient;