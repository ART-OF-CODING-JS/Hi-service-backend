'use strict';

const { users } = require('../models');
module.exports = async(req, res, next) => {
  require('dotenv').config();


  try {

    if (!req.headers.authorization) { next('Invalid Login') }

    const token = req.headers.authorization.split(' ').pop();

    let x = await users.authenticateToken(token);
   
    req.user=x;
 
  
    next();
     

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}