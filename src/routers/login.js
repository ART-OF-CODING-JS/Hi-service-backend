"use strict";

const express = require('express');
 const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');


authRouter.post('/login', basicAuth, (req,res)=>{

  // console.log(req.cookies)
  res.status(200).json(req.user);

})

module.exports = authRouter


