"use strict";

const bcrypt = require("bcrypt");
const { users } = require("../models/index-model");
const express = require("express");
const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
  const mail = require("./email");
  try {
    const { role, email, username, city, gender, birthday, phoneNumber, professions, password, image } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);

    // add email

    const record = await users.create({ username: username, password: passwordhash, role: role, email: email, city: city, gender: gender, birthday: birthday, phoneNumber: phoneNumber, professions: professions, image: image });
    console.log({ record });

  // to send email verification
    mail(req.body.email)

  res.status(201).json(record);

    res.status(201).json(record);
  } catch (err) {
    console.log(err);
  }
});

module.exports = authRouter;
