async function address (message) {
  try{
    message.reply ('Re:M is located on Faerie, Lavender Beds, Ward 20 Plot 34.');
  } catch (err) {
    console.log(err);
  }
}

module.exports = address;
