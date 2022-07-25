
"use strict";
const express = require('express');

const { service }= require('../models/index-model');
const bearer = require('../middleware/bearer')
const lastNewRouter = express.Router();

 lastNewRouter.get('/lastnews',bearer,async (req, res) => {
   
    
    let allRecords = await service.findAll({ 
          
            order: [['id', 'DESC']]
        }
    );
    res.status(200).json(allRecords);
    
    
  })
  module.exports = lastNewRouter;