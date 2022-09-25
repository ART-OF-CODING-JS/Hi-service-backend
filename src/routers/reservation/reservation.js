"use strict";

const { reservation, users, service } = require("../../models/index-model");
const express = require("express");
const reservationRouter = express.Router();
const bearer = require("../../middleware/bearer");
const loger = require("../../logger");
// for user
reservationRouter.post("/sendRequest", bearer, handelReservation);
reservationRouter.delete("/deleteRequest/:id", bearer, handelDeleteRequest);
// for user provider

reservationRouter.put("/confirm/:id", bearer, handelConfirm);
reservationRouter.put("/reject/:id", bearer, handelReject);

// for admin
reservationRouter.get("/admin/allReservation", bearer, handleAllReservation);

// send request from user
async function handelReservation(req, res) {
  const { userID, serviceID, description, date, time } = req.body;
  const tokenId = req.user.id;
  const fineUser = await users.findAll({ where: { id: userID } });
  if(req.body.userID==tokenId || (req.user.role === 'admin')){
  const createNewReservation = await reservation.create({
    date: date,
    userID: userID,
    serviceID: serviceID,
    description: description,
    time: time,
  });
 
  
  loger.info(`${req.user.username} has send reservation request`, {
    timestamp: new Date().toString(),
  });

  res.status(201).send(createNewReservation);}
  else{
    res.status(404).send("you are not allowed to post here")
  }
  
}

// delete request from user
async function handelDeleteRequest(req, res) {
  const { id } = req.params;
  const tokenId = req.user.id;

  const findUserId = await reservation.findOne({ where: { id: id } });

  // to handle admin access
  if (tokenId === findUserId.userID || req.user.role === "admin") {
    const check = await reservation.destroy({ where: { id: id } });

    loger.info(`${req.user.username} has delete his reservation`, {
      timestamp: new Date().toString(),
    });

    if (!check) res.status(404).send("Error");

    res.status(204).send("deleted");
  } else {
    res.status(404).send("Access denied");
  }
}

// send confirm from userProvider
async function handelConfirm(req, res) {
  const ID = req.params.id;
  const findReservation = await reservation.findOne({ where: { id: ID } });
  const updateStatus = await findReservation.update({ status: "confirm" });

  res.status(201).send("You are confirm reservation successfully !");
}

// send reject from userProvider

async function handelReject(req, res) {
  const ID = req.params.id;
  const findReservation = await reservation.findOne({ where: { id: ID } });
  const updateStatus = await findReservation.update({ status: "reject" });

  res.status(201).send("You are reject reservation successfully !");
}

// admin read all reservation

async function handleAllReservation(req, res) {
  if(req.user.role === 'admin') {

    const findAllReservation = await reservation.findAll();
    res.status(201).send(findAllReservation);
  }else {
    res.status(404).send("Access denied");
  }
}

module.exports = reservationRouter;
