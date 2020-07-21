const config = require('../config/config.json');

async function role (message) {
  try{
      if (message.content.match(/alerts/i)) {
        var role = message.guild.roles.fetch('733445445262508142');
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
