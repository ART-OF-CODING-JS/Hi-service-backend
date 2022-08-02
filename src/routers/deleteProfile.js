"use strict";

const express = require("express");
const deleteProfileRouter = express.Router();

const { users } = require("../models/index-model");
const bcrypt = require("bcrypt");
const bearer = require("../middleware/bearer");
const loger = require("../logger");

// Delete profile by himself
deleteProfileRouter.post("/deleteprofile", bearer, async (req, res) => {
  let userId = parseInt(req.body.id);
  let password = req.body.password;
  let confirmPass = req.body.confirmPass;
  let token = parseInt(req.user.id);

  if (token === userId) {
    if (password === confirmPass) {
      try {
        let foundUser = await users.findOne({ where: { id: userId } });
        let validPass = await bcrypt.compare(password, foundUser.password);

        if (foundUser) {
          if (validPass) {
            let deleteProfile = await users.destroy({ where: { id: userId } });

            loger.info(`${foundUser.username} delete his profile`, {
              timestamp: new Date().toString(),
            });

            res.status(201).send({ status: "User Profile Deleted successfully!" });
          } else res.status(404).send("Tha password not correct!");
        } else res.status(404).send("Something went wrong!");
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(404).send({ status: "The passwords did not match" });
    }
  } else res.status(404).send("Access Denied");
});

module.exports = deleteProfileRouter;
