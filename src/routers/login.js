"use strict";

const express = require('express');
 const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');
const isBlocked = require('../middleware/is blocked')
const loger = require('../logger')

authRouter.post('/login', basicAuth, isBlocked,(req,res)=>{

  // console.log(req.cookies)
  loger.info(req.user.username+" "+"signin", {
    timestamp: new Date().toString(),
  })
  res.status(200).json(req.user);

})


module.exports = authRouter


