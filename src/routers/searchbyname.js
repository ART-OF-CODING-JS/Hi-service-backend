"use strict";
const { users,service } = require("../models/index-model");
const express = require('express');
const bearer=require("../middleware/bearer")
const loger = require('../logger')

const searchRouter = express.Router();



searchRouter.post('/byName',bearer,async(req, res)=>{

  try {
    const {title} = req.body;
  
    const records = await service.searchService(title)
    console.log(req.body.title)
  //   loger.info(req.user.username+" "+" "+"serach for services"+req.body.title, {
  //   timestamp: new Date().toString(),
  // })
    res.status(201).json(records);


  } catch (err) {
    console.log(err);
  }
})

module.exports = searchRouter;

