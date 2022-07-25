'use strict';

const { service } = require("../../models/index-model");
const express = require('express');
const bearer = require("../../middleware/bearer")

const departRouter = express.Router();



departRouter.post('/department',bearer,async(req, res)=>{


    try {
        const {department} = req.body;
      
      const departments = await service.findAll({where:{department:department}})
      console.log(department)
        res.status(201).json(departments);
    
    
      } catch (err) {
        console.log(err);
      }


})

module.exports = departRouter;