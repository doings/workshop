
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')

var config = require('./config/database');

/* Body parse middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* CORS middleware */
app.use(cors({
  origin: '*',
  credentials: true
}));

mongoose.connect(config.database);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  require('./services/index.js')(app);
  require('./services/movement.js')(app);

  app.listen(3000, function () {
    console.log('doings-api listening on port 3000!')
  })
});