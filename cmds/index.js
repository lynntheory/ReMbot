//required files
const config = require('../config/config.json');

const setStatus = require('./setStatus.js');
const address = require('./address.js');
const hours = require('./hours.js');
const menu = require('./menu.js');
const role = require('./role.js');
const website = require('./website.js');






const commands = {
  'setStatus': setStatus,
  'menu': menu,
  'website': website,
  'address': address,
  'location': location,
  'hours': hours
};

module.exports.check = function(message) {
  let args = message.content.slice(config.Prefix.length).split(" ");
  if(message.content.startsWith(config.Prefix)) {
    if(commands[args[0]] != undefined) {
      return commands[args[0]](message);
    } else {
      console.log('This command does not exist!');
      return;
    }
  }
}
