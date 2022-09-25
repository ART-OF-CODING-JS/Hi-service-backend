"use strict";
const { Op } = require("sequelize");
const express = require("express");
const blockRouter = express.Router();

const { Sequelize } = require("sequelize");

const { users } = require("../../models/index-model");
const bearer = require("../../middleware/bearer");

// **block for users**
blockRouter.put("/block/:userId", bearer, handelBlock);
blockRouter.put("/unblock/:userId", bearer, handelUnblock);
blockRouter.get("/block/user", bearer, handelGetAllUserBlock);

// block
async function handelBlock(req, res) {
  const userId =parseInt(req.params.userId)
  const tokenId = req.user.id;

  const findUser = await users.findOne({ where: { id: tokenId } });

  const addToBlockList = await findUser.update({
    usersBlockList: Sequelize.fn("array_append", Sequelize.col("usersBlockList"), userId),
  });

  res.status(202).send("Block successfully");
}
// unblock
async function handelUnblock(req, res) {
  const userId =parseInt(req.params.userId) ;
  console.log({userId});

  const tokenId = req.user.id;
  const findUser = await users.findOne({ where: { id: tokenId } });
  const addToBlockList = await findUser.update({
    usersBlockList: Sequelize.fn("array_remove", Sequelize.col("usersBlockList"), userId),
  });

  res.status(202).send("unblock successfully");
}

// The user can see the user who block them ...
async function handelGetAllUserBlock (req,res) {
  const tokenId = req.user.id;
  const findUser = await users.findOne({ where: { id: tokenId } });

  let allRecords = await users.findAll({
    where: 
      { id: { [Op.in]: findUser.usersBlockList } }
  });
  res.status(200).send(allRecords)
}




module.exports = blockRouter;
