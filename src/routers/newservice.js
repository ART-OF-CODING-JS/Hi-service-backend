'use strict';

const { service } = require("../models/index-model");
const express = require('express');
// const bearer=require("../middleware/bearer")

const newServiceRouter = express.Router();



newServiceRouter.get('/new',async(req, res)=>{


    try {
    
      const newService = await service.findAll({order:['id',"DESC"]})
      console.log(newService)
        res.status(201).json(newService);
    
    
      } catch (err) {
        console.log(err);
      }


})

module.exports = newServiceRouter;