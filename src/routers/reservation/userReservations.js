'use strict';

const { reservation, service } = require("../../models/index-model");
const express = require("express");
const userReservationRouter = express.Router();
const bearer = require("../../middleware/bearer");

userReservationRouter.get('/userReservations',bearer,handeluserReservations)

////// user  can read all reservation..
async function handeluserReservations(req,res){

const token = req.user.id

const myreservations = await reservation.findAll({where:{userID:token}})

let array = [];
    for (const iterator of myreservations) {
      array.push(iterator.serviceID);
    }  
      
const myreservationsServices = await service.findAll({ where: { id: array } })

res.status(200).send(myreservationsServices)

}
module.exports = userReservationRouter