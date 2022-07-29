"use strict";

const bcrypt = require("bcrypt");
const express = require("express");
const updatepassword = express.Router();
const bearer = require("../../middleware/bearer");
const { users } = require("../../models/index-model");

// Change password
updatepassword.put("/updatepassword", bearer, async (req, res, next) => {
  const tokenId = req.user.id;
  const role = req.user.role;
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  try {
    // we can delete ID but we will see if we will needed in frontend
    let ID = parseInt(req.params.id);
    const found = await users.findOne({ where: { id: tokenId } });
    const valid = await bcrypt.compare(oldPass, found.password);

    if ((found && tokenId === ID) || (role === "admin" && found) || (role !== "admin" && found)) {
      if (valid) {
        const password = await bcrypt.hash(newPass, 10);
        let updates = await found.update({ password: password });

        res.status(201).send({ status: "Update password successfully!" });
        next();
      } else {
        res.status(404).send("Tha old password it's not correct !");
      }
    } else {
      res.status(404).send("Access denied!");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = updatepassword;
