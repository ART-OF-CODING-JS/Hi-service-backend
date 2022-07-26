"use strict";

const bcrypt = require("bcrypt");
const { users } = require("../models/index-model");
const express = require("express");
const authRouter = express.Router();
const {companyForm}=require("./signupCompany")
const mail = require('./email')
const loger = require('../logger')
authRouter.post('/signup', async (req, res) => {
  
  try {
    const { role,email, username, city, gender, birthday, phoneNumber, professions, password, companyOrUser,image } =req.body
    const passwordhash = await bcrypt.hash(password, 10);
    // add email
    const record = await users.create({ username: username, password: passwordhash, role: role, companyOrUser: companyOrUser, email: email, city: city,
       gender: gender, birthday: birthday
       , phoneNumber: phoneNumber, professions: professions ,image:image});
    
    loger.info(record.username+" "+"signup", {timestamp: new Date().toString(),})

    // mail(req.body.email)
    res.status(201).json(record);

if(req.body.companyOrUser==="company"){
  // res.redirect("/signup/company")
  companyForm()
}
    


  } catch (err) {
    console.log(err);
  }
});

module.exports = authRouter;
