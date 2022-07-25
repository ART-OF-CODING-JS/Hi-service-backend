
"use strict";
const express = require('express');

const { interactions }= require('../models/index-model');
const bearer = require('../middleware/bearer')
const mostRatedRouter = express.Router();

mostRatedRouter.get('/mostrated',bearer,async (req, res) => {
   
    
    let allRecords = await interactions.findAll({ 
            limit: 3 ,
            order: [['rate', 'DESC']]
        }
    );
    res.status(200).json(allRecords);
    
    
  })
  module.exports = mostRatedRouter;