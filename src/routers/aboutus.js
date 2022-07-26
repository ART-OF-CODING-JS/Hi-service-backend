'use strict';
const express = require('express');
const { users } = require("../models/index-model");
const aboutUsRouter = express.Router();



aboutUsRouter.get ('/aboutus',async(req, res)=>{


let aboutUsRouter = await users.findAll({where:{role :'admin'}});


const list = aboutUsRouter.map(user =>[user.username,user.phoneNumber,user.email] );
res.status(200).json( {'message': 'Executive Leadership Team',list});


})
module.exports = aboutUsRouter;
