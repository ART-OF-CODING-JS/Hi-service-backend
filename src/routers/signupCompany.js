"use strict";
const bcrypt = require("bcrypt");
const { company } = require("../models/index-model");
const express = require('express');
const authRouter = express.Router();

function companyForm(){

authRouter.post ('/signup/company',async(req, res)=>{

  try {
    const { companyName, services, owner, location,commercialRegister  } = req.body;
   
    const record = await company.create({ companyName: companyName,services: services, owner: owner, location: location,  commercialRegister: commercialRegister });
    console.log({ record });
    res.status(201).json(record);
    

  } catch (err) {
    console.log(err);
  }
})
}
module.exports = {companyForm,authRouter};

