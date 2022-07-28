'use strict';

const { service } = require("../../models/index-model");
const express = require('express');
const bearer = require("../../middleware/bearer")

const departRouter = express.Router();



departRouter.post('/department',bearer,async(req, res)=>{


    try {
        const {department} = req.body;
      
      const departments = await service.findAll({where:{department:department}})

      // loger.info(findUser.username+" "+"is un blocked by admin ", {
      //   timestamp: new Date().toString(),
      // })
        res.status(201).json(departments);
    
    
      } catch (err) {
        console.log(err);
      }


})

module.exports = departRouter;