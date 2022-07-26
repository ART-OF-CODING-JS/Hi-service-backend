'use strict';
const express = require('express');
const { users } = require("../models/index-model");
const aboutusRouter = express.Router();



aboutusRouter.get ('/aboutus',async(req, res)=>{


let admineRecords = await users.findAll({where:{role :'admin'}});


const list = admineRecords.map(user =>[user.username,user.phoneNumber,user.email] );
res.status(200).json( {'message': 'Executive Leadership Team',list});


})
module.exports = aboutusRouter;
