const twilio = require('twilio');

const sid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(sid, authToken);
const MessagingResponse = twilio.twiml.MessagingResponse;
let list = [];

module.exports.countryHandler = function countryHandler(req, res) {
  const country = req.query.FromCountry;
  const response = new MessagingResponse();

  response.message(`Hi! It looks like your phone number was born in ${country}`);

  res.send(response.toString());
};

module.exports.timestampHandler = function timestimestampHandlertamp(req, res) {
  const time = Date.now();

  return client.messages.create({
    body: `Greetings! The current time is: ${time} FOE0K69FGIHV3C7`,
    to: '+12092104311',  // Text this number
    from: process.env.TWILIO_VERIFIED_NUMBER // From a valid Twilio number
  })
  .then((message) => {
    console.log(message.sid, time);
    res.json({ time });
  })
  .catch(console.error);
};

module.exports.todoListHandler = function todoListHandler(req, res) {
  const response = new MessagingResponse();
  const msg = req.query.Body;
  let msgLowercase = ` ${msg}`.slice(1).toLowerCase();
  let item;

  if (msgLowercase.startsWith('add')) {
    item = msg.substring(3).trim();
    list.push(item);
    console.log(`Adding: ${item}`);
    response.message(`"${item}" has been added`);
  } else if (msgLowercase.startsWith('list')) {
    if (list.length) {
      const opts = {
        action: `${process.env.HOST}/status`,
        method: 'POST',
      };
      response.message(
        opts,
        list.map((el, index) => `${index + 1}. ${el}`).join('\n'),
      );
    } else {
      response.message('Nothing to do yet');
    }
  } else if (msgLowercase.startsWith('remove')) {
    const itemNo = msg.substring(-1, 1).trim();
    const item = list.splice(itemNo - 1, 1);
    console.log(`Removing: ${item}`);
    response.message(`"${item}" has been removed`);
  } else {
    console.log(`Not a valid request: ${msg}`);
  }

  res.send(response.toString());
};

module.exports.deliveryStatusHandler = function deliveryStatusHandler(req, res) {
  const status = req.body['MessageStatus'];
  console.log('MessageSid:', status);
  console.log('MessageSid:', req.body['MessageSid']);
  console.log('X-Twilio-Signature:', req.headers['x-twilio-signature']);
  console.log('-------------------------');
  res.send(status);
};