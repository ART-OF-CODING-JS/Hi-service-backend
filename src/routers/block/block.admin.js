"use strict";
const express = require("express");
const blockRouter = express.Router();

const { users } = require("../../models/index-model");
const bearer = require("../../middleware/bearer");

// **block for admin**

blockRouter.put("/admin/block/:id", bearer, handelBlock);
blockRouter.put("/admin/unblock/:id", bearer, handelUnblock);

// block
async function handelBlock(req, res) {
  const { id } = req.params;
  const {role} = req.user;

  if (role !== "admin") {
    res.send("Access denied");
    return
  }
  try {
    const findUser = await users.findOne({ where: { id: id } });

    const addToBlock = await findUser.update({
      blocked: true,
    });

    res.status(202).send("Block successfully");
  } catch (err) {
    console.log(err);
  }
}

// unblock
async function handelUnblock(req, res) {
  const { id } = req.params;
  const token = req.user.role;

  if (token !== "admin") {
    res.status(404).send("Access denied");
  }
  try {
    const findUser = await users.findOne({ where: { id: id } });

    const addToBlock = await findUser.update({
      blocked: false,
    });

    res.status(202).send("unBlock successfully");
  } catch (err) {
    console.log(err);
  }
}

module.exports = blockRouter;
