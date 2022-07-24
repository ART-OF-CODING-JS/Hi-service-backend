'use strict';

const base64 = require('base-64');
const { users } = require('../models/index-model');
// const bearer = require('./bearer')

module.exports = async (req, res, next) => {

   if (!req.headers.authorization) {
    next()
     return _authError(); 
    };
 // ['Basic', 'sdkjdsljd=']
 // sdkjdsljd=
  let basic = req.headers.authorization.split(' ').pop();
// "username:password" 
// username, password
  let [username, pass] =base64.decode(basic).split(':');
  try {
    
    req.user=await users.authenticateBasic(username, pass);
    // res.cookie('jwt', req.user.token,{
    //   httpOnly:true
    // });
      next();
   

  } catch (e) {
  console.error(e);
    res.status(403).send('Invalid Login');
  }

}
