"use strict";
const { users,service } = require("../models/index-model");
const express = require('express');
const bearer=require("../middleware/bearer")
const loger = require('../logger')

const searchCity = express.Router();



searchCity.post('/byCity',bearer,async(req, res)=>{

  try {
    const {city} = req.body;
  
    const records = await service.searchCity(city)
    console.log(req.body.city)
  //   loger.info(req.user.username+" "+" "+"serach for services"+req.body.title, {
  //   timestamp: new Date().toString(),
  // })
    res.status(201).json(records);


  } catch (err) {
    console.log(err);
  }
})

module.exports = searchCity;
