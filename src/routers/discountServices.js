"use strict";
const express = require('express');

const { service }= require('../models/index-model');
//const bearer = require('../middleware/bearer')
const discountRouter = express.Router();

discountRouter.get('/discount',async (req, res) => {
   
    
    let discountRecords = await service.findAll({where:{discount :'true'}});
    res.status(200).json(discountRecords);
    
    
  })
module.exports = discountRouter;