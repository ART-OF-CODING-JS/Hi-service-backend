"use strict";
const bcrypt = require("bcrypt");
const { users } = require("../models/index-model");
const express = require('express');
const nodeMailer = require("nodemailer");
const authRouter = express.Router();
authRouter.post ('/signup',async(req, res)=>{

  try {
    const { role, email, username, city, gender, birthday, phoneNumber, professions, password } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);
    const record = await users.create({ username: username, password: passwordhash, role: role, email: email, city: city, gender: gender, birthday: birthday, phoneNumber: phoneNumber, professions: professions });
    console.log({ record });
    res.status(201).json(record);
    

  } catch (err) {
    console.log(err);
  }
})

module.exports = authRouter;

