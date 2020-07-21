const config = require('../config/config.json');


async function role (message) {
  var subject = message.member;
  try{
      if (message.content.match(/alerts/i)) {

        subject.roles.add('733445445262508142');
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
