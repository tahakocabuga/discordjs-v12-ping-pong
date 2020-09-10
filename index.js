const Client = require('./structures/Client');
new Client().start(require('./config.json').Token, `./commands`);