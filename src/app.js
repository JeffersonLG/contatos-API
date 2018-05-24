const express = require('express'),
      app = express(),
      debug = require('debug')('api:server'),
      http = require('http'),
      bodyParser = require('body-parser'),
      router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./app/controllers/index')(app)

const route = router.get('/', (req, res, next)=> {
  res.status(200).send({
    title: "API Lista de Contatos.",
    version: "1.0.2"
  })
})
app.use('/', route)

module.exports = app;
