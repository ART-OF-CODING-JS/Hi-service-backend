"use strict";
const bcrypt = require("bcrypt");
const { company } = require("../models/index-model");
const express = require('express');
const authRouter = express.Router();
authRouter.post ('/signup/company',async(req, res)=>{

  try {
    const { companyName, email, password , services, owner,  phoneNumber, city, location,commercialRegister  } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);
    const record = await company.create({ companyName: companyName, password: passwordhash, services: services, email: email, city: city, owner: owner, location: location, phoneNumber: phoneNumber, commercialRegister: commercialRegister });
    console.log({ record });
    res.status(201).json(record);
    

  } catch (err) {
    console.log(err);
  }
})

module.exports = authRouter;