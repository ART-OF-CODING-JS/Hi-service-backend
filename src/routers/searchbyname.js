"use strict";
const { users,service } = require("../models/index-model");
const express = require('express');
const bearer=require("../middleware/bearer")

const searchRouter = express.Router();



searchRouter.post('/byName',bearer,async(req, res)=>{

  try {
    const { searchTerm} = req.body;
  
    const records = await service.searchService(searchTerm)
    console.log({ records });
    res.status(201).json(records);


  } catch (err) {
    console.log(err);
  }
})

module.exports = searchRouter;

