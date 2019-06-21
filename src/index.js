const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()

const jsonParser = bodyParser.urlencoded({ extended: true });
const {
  countryHandler,
  deliveryStatusHandler,
  timestampHandler,
  todoListHandler
} = require('./controllers');

app.get('/country', countryHandler);
app.get('/sms', todoListHandler);
app.post('/status', jsonParser, deliveryStatusHandler);
app.get('/', timestampHandler);

const server = app.listen(8081, function () {
  const host = server.address().address
  const port = server.address().port
   
  console.log("Example app listening at http://%s:%s", host, port)
})