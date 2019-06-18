var express = require('express');
var app = express();
var twilio = require('twilio');

require('dotenv').config()

var sid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

var client = new twilio(sid, authToken);


app.get('/', function (req, res) {
  console.log('POST recieved');
  const time = Date.now();

  return client.messages.create({
    body: `Greetings! The current time is: ${time} FOE0K69FGIHV3C7`,
    to: '+12092104311',  // Text this number
    from: '+17209437594' // From a valid Twilio number
  })
  .then((message) => {
    console.log(message.sid, time);
    res.json({ time });
  })
  .catch(console.error);
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
   
  console.log("Example app listening at http://%s:%s", host, port)
})