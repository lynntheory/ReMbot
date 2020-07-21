const config = require('../config/config.json');

async function role (message) {
  try{
      if (message.content.match(/alerts/i)) {
        let myRole = message.guild.roles.get("733445445262508142");
        let subject = message.member;
        member.roles.add(myRole);
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
