"use strict";

const express = require('express');
 const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');
const isBlocked = require('../middleware/is blocked')

authRouter.post('/login', basicAuth, isBlocked,(req,res)=>{

  // console.log(req.cookies)
  res.status(200).json(req.user);

})


module.exports = authRouter


