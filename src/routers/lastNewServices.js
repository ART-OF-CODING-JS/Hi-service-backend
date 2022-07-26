
"use strict";
const express = require('express');

const { service }= require('../models/index-model');
const bearer = require('../middleware/bearer')
const lastNewRouter = express.Router();
const loger = require('../logger')

 lastNewRouter.get('/lastnews',bearer,async (req, res) => {
   
    
    let allRecords = await service.findAll({ 
      // create At : its mean the time that did user signup in website
            order: [['createdAt', 'DESC']]
        }
    );
    //logger//
    loger.info(req.user.username+" "+"get last services", { timestamp: new Date().toString(),})
    res.status(200).json(allRecords);
    
    
  })
  module.exports = lastNewRouter;