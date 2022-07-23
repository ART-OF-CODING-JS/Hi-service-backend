'use strict';

const { users } = require('../models/index-model');
module.exports = async(req, res, next) => {
  try {

    if (!req.headers.authorization) { next('Invalid Login') }
   // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaWhhYiIsImlhdCI6MTY1NTA0ODcxMX0.ZEiWN5JiWGvGFr4s3Q6NRLGMHahoTOV3OkiXLfJTvhk
    const token = req.headers.authorization.split(' ').pop();

    let x = await users.authenticateToken(token);
   
    req.user=x;
 
  
    next();
     

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}