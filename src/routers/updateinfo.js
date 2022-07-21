"use strict";

// update password and username
const { users } = require("../models/index-model");
const bcrypt = require("bcrypt");

// change username
async function updateUsername(req, res, next) {
  let tokenId = req.user.id;
  let role = req.user.role;

  try {
    let ID = parseInt(req.params.id);

    const username = req.body.username;

    const found = await users.findOne({ where: { id: ID } });

    if ((found && tokenId === ID) || (role == "admin" && found)) {
      if (req.body.username) {
        let updates = await found.update({
          username: username,
        });
        res.status(201).send({
          status: "Update username successfully!",
          "username updated to": updates.username,
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
}

// Change password

async function updatePassword(req, res, next) {
  const tokenId = req.user.id;
  const role = req.user.role;
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  try {
    let ID = parseInt(req.params.id);
    const found = await users.findOne({ where: { id: ID } });
    const valid = await bcrypt.compare(oldPass, found.password);

    if ((found && tokenId === ID) || (role == "admin" && found)) {
      if (valid) {
        // to change the password

        const password = await bcrypt.hash(newPass, 10);
        let updates = await found.update({
          password: password,
        });
        res.status(201).send({ status: "Update password successfully!" });

        next();
      } else {
        res.status(404).send("Tha old password it's correct !");
      }
    } else {
      res.status(404).send("Access denied!");
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { updateUsername, updatePassword };
