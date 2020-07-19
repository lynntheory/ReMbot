async function setStatus (message) {
  try{
    const args = message.content.replace('!setStatus ', ' ');
    message.client.user.setActivity(args);
    message.reply ('Aye aye!');
  } catch (err) {
    console.log(err);
  }
}

module.exports = setStatus;
