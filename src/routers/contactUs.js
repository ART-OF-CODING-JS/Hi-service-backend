"use strict";
const express = require('express');

const {contactUs }= require('../models/index-model');
const bearer = require('../middleware/bearer')

const contactRouter = express.Router();

contactRouter.post('/contactus',bearer ,async (req, res) => {
  
  try { 
    
    const username=req.body.username;
    const email=req.body.email;
    const description=req.body.description;
    
   const createContactUs=await contactUs.create({username: username, email: email,description:description});
   res.status(201).json(createContactUs);
   console.log(createContactUs);

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