async function hours (message) {
  try{
    message.reply ('Re:M is open Tuesdays from 7pm to 11pm EST.');
  } catch (err) {
    console.log(err);
  }
}

module.exports = hours;
