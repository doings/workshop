
const express = require('express')
const app = express()
const mongoose = require('mongoose')

var config = require('./config/database');

mongoose.connect(config.database);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  require('./services/index.js')(app);

  app.listen(3000, function () {
    console.log('doings-api listening on port 3000!')
  })
});