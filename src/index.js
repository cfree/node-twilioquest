const express = require('express');
const app = express();
require('dotenv').config()

const { countryHandler, timestamp, todoList } = require('./controllers');

app.get('/', timestamp);
// app.get('/sms', countryHandler);
app.get('/sms', todoList);

const server = app.listen(8081, function () {
  const host = server.address().address
  const port = server.address().port
   
  console.log("Example app listening at http://%s:%s", host, port)
})