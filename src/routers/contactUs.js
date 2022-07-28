"use strict";
const express = require('express');

const {contactUs }= require('../models/index-model');
const bearer = require('../middleware/bearer')

const contactRouter = express.Router();
const loger = require('../logger')

contactRouter.post('/contactus',bearer ,async (req, res) => {
  
  try { 
    
    const username=req.body.username;
    const email=req.body.email;
    const description=req.body.description;
    
   const createContactUs=await contactUs.create({username: username, email: email,description:description});
   //logger
   loger.info(req.user.username+" "+"contact us with admin", {timestamp: new Date().toString(),});
   res.status(201).json(createContactUs);
 

  } catch (err) {
    console.log(err);
  }
});

// only the admin can get all records
contactRouter.get('/contactus',bearer,async (req, res) => {
  console.log("sssssssssssssssssssssssssssss555s",req.user.role)
  if(req.user.role === 'admin') {
  
  let allRecords = await contactUs.findAll();
  res.status(200).json(allRecords);
  }
  else {
    res.status(404).send("access denied"); 
  }
})


module.exports = contactRouter;