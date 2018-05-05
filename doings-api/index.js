
const express = require('express')
const app = express()

require('./services/index.js')(app);

app.listen(3000, function () {
  console.log('doings-api listening on port 3000!')
})
