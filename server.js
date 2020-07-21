//required files
const Express = require('express');
const app = Express();
const http = require('http');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const config = require('./config/config.json');
const cmds = require('./cmds/index.js');

const presence = [
  "for friends",
  "for customers"
  ];

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
setInterval(function() {
    http.get(`http://rememoriesbot.herokuapp.com/`);
}, 300000);

client.on('ready', () => {
  console.log(`ReMbot has started, with ${client.users.size} users in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  const presence = "for messages";
  client.user.setActivity(presence, { type: 'WATCHING' });
});

client.on('guildMemberAdd', member => {
	if (config.welcomeEnabled !== "true") {
    console.log (`Welcome message disabled. See config/config.js.`);
    return;
  }
  const welcomeMessage = config.welcomeMessage.replace("{{user}}", member.user.tag);
  const channel = member.guild.channels.find(channel => channel.name === config.welcomeChannel);
	if (!channel) return;
	try{
    channel.send(welcomeMessage);
  } catch(err) {
    console.log(err);
  }
});

client.on('message', async (message) =>{
  if (message.author.bot) return;
  if (message.content.startsWith(config.Prefix)) {
    cmds.check(message);
    return;
  }
});

client.login(process.env.SECRET);
