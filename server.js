//required files
const Express = require('express');
const app = Express();
const http = require('http');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const config = require('./config/config.json');
const cmds = require('./cmds/index.js');
const initialScanner = require('./scanners/initial.js');
const secondaryScanner = require('./scanners/secondary.js');

const presence = [
  "for friends",
  "for customers"
  ];

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
setInterval(function() {
    http.get(`http://rembot.herokuapp.com/`);
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

//AUDIT LOG SCRIPTS BELOW HERE 
client.on('messageDelete', async message => {
	// ignore direct messages
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const deletionLog = fetchedLogs.entries.first();

	// Let's perform a sanity check here and make sure we got *something*
	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

	// We now grab the user object of the person who deleted the message
	// Let us also grab the target of this action to double check things
	const { executor, target } = deletionLog;


	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same author's message
	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
	}	else {
		console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
	}
});

client.on('guildMemberRemove', async member => {
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const kickLog = fetchedLogs.entries.first();

	// Let's perform a sanity check here and make sure we got *something*
	if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

	// We now grab the user object of the person who kicked our member
	// Let us also grab the target of this action to double check things
	const { executor, target } = kickLog;

	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same kicked member
	if (target.id === member.id) {
		console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
	} else {
		console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
	}
});

client.on('guildBanAdd', async (guild, user) => {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const banLog = fetchedLogs.entries.first();

	// Let's perform a sanity check here and make sure we got *something*
	if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

	// We now grab the user object of the person who banned the user
	// Let us also grab the target of this action to double check things
	const { executor, target } = banLog;

	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same kicked member
	if (target.id === user.id) {
		console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, wielded by the mighty ${executor.tag}`);
	} else {
		console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, audit log fetch was inconclusive.`);
	}
});

client.login(process.env.SECRET);
