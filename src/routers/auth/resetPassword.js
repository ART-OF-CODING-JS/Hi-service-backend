"use strict";

const express = require("express");
const resetpasswordRouter = express.Router();

const bearer = require("../../middleware/bearer");

const { users } = require("../../models/index-model");
const bcrypt = require("bcrypt");

// in login page there is a button call (forget my password) to reset password .
resetpasswordRouter.post("/resetpassword", async (req, res, next) => {
  const { username, newPassword, email } = req.body;
  try {
    const foundUser = await users.findOne({ where: { username: username } });

    if (foundUser) {
      if (email === foundUser.email) {
        const password = await bcrypt.hash(newPassword, 10);
        let updates = await foundUser.update({
          password: password,
        });
        res.send("The password updated successfully !");
        next();
      } else {
        res.send("The email it is not correct!");
      }
    } else {
      res.send("The username is not correct !");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = resetpasswordRouter;
