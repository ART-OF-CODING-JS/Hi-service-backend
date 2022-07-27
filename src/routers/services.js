"use strict";

// **service table to get and post and update and delete services**

const express = require("express");
const router = express.Router();
const { service, users } = require("../models/index-model");
const bearer = require("../middleware/bearer");
const { Op } = require("sequelize");

router.get("/service", bearer, handleGetAll);
router.get("/service/:id", bearer, handleGetOne);
router.post("/service", bearer, handleCreate);
router.put("/service/:id", bearer, handleUpdate);
router.delete("/service/:id", bearer, handleDelete);

// Get All Records
async function handleGetAll(req, res) {
  const tokenId = req.user.id;

  const findUser = await users.findOne({ where: { id: tokenId } });

  let allRecords = await service.findAll({
    where: {userID:{[Op.notIn]: findUser.usersBlockList} },
  });
  
  res.status(200).json(allRecords);
}

// Get one Records
async function handleGetOne(req, res) {
  const id = req.params.id;

  let readOne = await service.findOne({ where: { id: id } });
  console.log("time is", readOne.createdAt);
  res.status(200).json(readOne);
}

// Create records
async function handleCreate(req, res) {
  const tokenId = req.user.id;
  const obj = req.body;
  let services;
  // just for service model to check if user has more than 3 ,..,.. services
  services = await service.paymentFunction(tokenId); // function to get number of services
  if (
    services.numberService < 3 ||
    services.foundUser.didPay ||
    req.user.role === "admin"
  ) {
    let newRecord = await service.create(obj);
    res.status(201).json(newRecord);
  } else {
    res.status(404).send("You should pay !!");
    // in frontend we should render payment page
  }
}

// Update records
// user can update on his service or... but not allow edit on service users.
// admin can edit on all of the services .....
async function handleUpdate(req, res) {
  const tokenId = req.user.id;
  const role = req.user.role;
  const newUpdate = req.body;

  let ID = req.params.id;
  const found = await service.findOne({ where: { id: ID } });

  if (tokenId === found.userID || (role == "admin" && found)) {
    let updates = await found.update(newUpdate);
    res.status(201).json(updates);
  } else {
    res.status(404).send("can't find the user !");
  }
}

// Delete records
async function handleDelete(req, res) {
  const tokenId = req.user.id;
  const role = req.user.role;
  const ID = req.params.id;
  try {
    const foundUser = await service.findOne({ where: { id: ID } });

    if (tokenId === foundUser.userID || role === "admin") {
      const deletes = await foundUser.destroy(foundUser.id);
      res.status(204).send("Deleted successfully");
    } else {
      res.status(404).send("Access denied");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = router;
