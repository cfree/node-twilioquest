const express = require('express');
const app = express();
require('dotenv').config()

const outboundReq = require('./controllers/outbound');
const inboundReq = require('./controllers/inbound');

app.get('/', outboundReq);
app.get('/sms', inboundReq);

const server = app.listen(8081, function () {
  const host = server.address().address
  const port = server.address().port
   
  console.log("Example app listening at http://%s:%s", host, port)
})