const {Client,Collection} = require('discord.js');
const client = new Client({
  disableMentions: 'everyone',
  ws: {
    properties: {
      $browser: 'Discord Android'
    }
  }
});

client.commands = new Collection();

require('./utils/MongoDatabase')
require('./utils/CommandHandler')(client);
require('./utils/EventHandler')(client);

client.login(process.env.TOKEN);
module.exports = {client}
