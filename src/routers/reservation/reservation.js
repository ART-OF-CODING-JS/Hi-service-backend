"use strict";

const { reservation, users, service } = require("../../models/index-model");
const express = require("express");
const reservationRouter = express.Router();
const bearer = require("../../middleware/bearer");
// for user
reservationRouter.post("/sendRequest", bearer, handelReservation);
reservationRouter.delete("/deleteRequest/:id/:serviceID", bearer, handelDeleteRequest);
// for user provider

reservationRouter.put("/confirm/:id", bearer, handelConfirm);
reservationRouter.put("/reject/:id", bearer, handelReject);




// send request from user
async function handelReservation(req, res) {
  const { userID, serviceID, description, date , time} = req.body;

  const fineUser = await users.findAll({ where: { id: userID } });

  const createNewReservation = await reservation.create({
    date: date,
    userID: userID,
    serviceID: serviceID,
    description: description,
    time:time,
  });

  res.status(201).send(createNewReservation);
}

// delete request from user
async function handelDeleteRequest(req, res) {

const {id,serviceID} = req.params
const tokenId = req.user.id

// to handle admin access
if(req.user.role === 'admin'){
  
}
const check = await reservation.findOne({where:[{userID:tokenId},{serviceID:serviceID}]})
if(!check) res.status(404).send('Error')
const deleteRequest = await check.destroy(id)
console.log('!!!!!!!!!!',deleteRequest);
res.status(204).send('deleted')
}




// send confirm from userProvider
async function handelConfirm(req, res) {
 
  const ID = req.params.id
    const findReservation = await reservation.findOne({ where: { id: ID } });
    const updateStatus = await findReservation.update({status:'confirm'})

res.status(201).send('You are confirm reservation successfully !')
}

// send reject from userProvider

async function handelReject(req, res) {
  const ID = req.params.id
    const findReservation = await reservation.findOne({ where: { id: ID } });
    const updateStatus = await findReservation.update({status:'reject'})
 
res.status(201).send('You are reject reservation successfully !')
}

module.exports = reservationRouter;
