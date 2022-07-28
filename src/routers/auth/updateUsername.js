"use strict";

// update password and username
const express = require("express");
const updateUsername = express.Router();
const bearer = require("../../middleware/bearer");
const { users } = require("../../models/index-model");

// change username
updateUsername.put("/updateusername/:id", bearer, async (req, res, next) => {
  const role = req.user.role;
  const tokenId = req.user.id;
  const ID = parseInt(req.params.id);
  const username = req.body.username;
  try {
    const found = await users.findOne({ where: { id: ID } });
    if ((found && tokenId === ID) || (role === "admin" && found) || (role !== "admin" && found)) {
      if (req.body.username) {
        let updates = await found.update({
          username: username,
        });
        res.status(201).send({
          status: `Update username successfully to : ${updates.username}`,
        });
        next();
      } else {
        res.status(404).send("Enter username !");
      }
    } else {
      res.status(404).send("Access denied!");
    }
  } catch (e) {
    res.status(500).send("error update");
  }
});

module.exports = updateUsername;
