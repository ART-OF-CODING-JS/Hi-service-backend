"use strict";

const { reservation } = require("../../models/index-model");
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

  res.status(200).send(myReservations);
}
module.exports = userReservationRouter;
