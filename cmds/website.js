async function website (message) {
  try{
    message.reply ('Our website can be found at: https://rememories.carrd.co');
  } catch (err) {
    console.log(err);
  }
}

module.exports = website;
