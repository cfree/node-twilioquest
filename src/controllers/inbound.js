const twilio = require('twilio');

const sid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(sid, authToken);

module.exports = function outboundReq(req, res) {
  const country = req.query.FromCountry;
  const MessagingResponse = twilio.twiml.MessagingResponse;
  const response = new MessagingResponse();

  response.message(`Hi! It looks like your phone number was born in ${country}`);

  res.send(response.toString());
};