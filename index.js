'use strict';
require("dotenv").config()
// Start up DB Server
const { db } = require('./src/models/index-model');
db.sync()
  .then(() => {

    // Start the web server
    require('./src/server.js').start(process.env.PORT);
  });