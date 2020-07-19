async function menu (message) {
  try{
    message.reply ('Our menu can be found at: https://rememories.carrd.co/#bar');
  } catch (err) {
    console.log(err);
  }
}

module.exports = menu;
