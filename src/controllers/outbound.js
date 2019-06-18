const twilio = require('twilio');

const sid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(sid, authToken);

module.exports = function inboundReq(req, res) {
  const time = Date.now();

  return client.messages.create({
    body: `Greetings! The current time is: ${time} FOE0K69FGIHV3C7`,
    to: '+12092104311',  // Text this number
    from: process.env.TWILIO_VERIFIED_NUMBER // From a valid Twilio numberd
  })
  .then((message) => {
    console.log(message.sid, time);
    res.json({ time });
  })
  .catch(console.error);
};