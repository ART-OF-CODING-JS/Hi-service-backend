"use strict";

const { reservation, service } = require("../../models/index-model");
const express = require("express");
const MyReservationRouter = express.Router();
const bearer = require("../../middleware/bearer");

MyReservationRouter.get("/serviceProviderReservations",bearer,handelMyReservation);

// service provider can read all reservations..
async function handelMyReservation(req, res) {
  const tokenId = req.user.id;

  const allServicesUserProvider = await service.findAll({
    where: { userID: tokenId },
  });

  let array = [];
  for (const iterator of allServicesUserProvider) {
    array.push(iterator.id);
  }
  const findServices = await reservation.findAll({
    where: { serviceID: array },
  });

  res.status(200).send(findServices);
}

module.exports = MyReservationRouter;
