"use strict";

const { reservation, service } = require("../../models/index-model");
const express = require("express");
const userReservationRouter = express.Router();
const bearer = require("../../middleware/bearer");

userReservationRouter.get("/userReservations", bearer, handleUserReservations);

//user  can read all reservations..
async function handleUserReservations(req, res) {
  const token = req.user.id;

  const myReservations = await reservation.findAll({
    where: { userID: token },
  });

  let array = [];
  for (const iterator of myReservations) {
    array.push(iterator.serviceID);
  }

  const myReservationsServices = await reservation.findAll({
    where: { id: array },
  });

  res.status(200).send(myReservationsServices);
}
module.exports = userReservationRouter;
