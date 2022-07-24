"use strict";

const express = require("express");
const deleteProfileRouter = express.Router();

const { users } = require("../models/index-model");
const bcrypt = require("bcrypt");

// Delete profile by himself
deleteProfileRouter.post("/deleteprofile", async (req, res, next) => {
  let userId = req.body.id;
  let password = req.body.password;
  let confirmPass = req.body.confirmPass;

  if (password === confirmPass) {
    try {
      let foundUser = await users.findOne({ where: { id: userId } });
      let validPass = await bcrypt.compare(password, foundUser.password);

      if (foundUser) {
        if (validPass) {
          let deleteProfile = await users.destroy({ where: { id: userId } });
          res.status(201).send({ status: "User Profile Deleted successfully!" });
          next();
        } else res.status(404).send("Tha password not correct!");
      } else res.status(404).send("Something went wrong!");
    } catch (err) {
      next(err);
    }
  } else {
    res.status(404).send({ status: "The passwords did not match" });
  }
});

module.exports = deleteProfileRouter;
