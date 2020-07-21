const config = require('../config/config.json');

const roles = [
  'alerts'
];
var role;

async function role (message) {
  try{
      if (message.content.match(/alerts/i)) {
        role = message.guild.roles.cache.find(role => role.name === "alerts");
        message.member.roles.add(role);
        message.reply('Alerts role added.');
    } else {
      console.log('This role does not exist!');
      return;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = role;
