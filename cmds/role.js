const config = require('../config/config.json');

const roles = {
  'alerts': alerts
};

async function role (message) {
  try{
    let args = message.content.slice(config.Prefix.length).split(" ");
    if(roles[args[1]] != undefined) {
      //alerts
      if (message.content.match('alerts')) {
        message.member.roles.add(alerts);
        message.reply('Alerts role added.');
      }
    } else {
      console.log('This role does not exist!');
      return;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = role;
