'use strict';

// 3rd Party Resources
//  require("dotenv").config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// // Esoteric Resources
const logger=require('./middleware/logger');
const errorHandler = require('./errorhandler/500');
const notFound = require('./errorhandler/404');
const login = require('./routers/login');
const signup = require('./routers/signup');
const routerV2=require('./routers/api')
// const cookieParser = require('cookie-parser')
// // Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
  res.send("Application app");
})
// Routes
app.use('/users',signup);
app.use('/users',login);
// // app.use('/users',authRoutes);
app.use('/api/v2',routerV2);
// // Catchalls
app.use(logger)
app.use(notFound);
app.use(errorHandler);




module.exports = {
  server: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};