'use strict';

const { reservation,users ,service} = require("../models/index-model");
const express = require('express');
const reservationRouter = express.Router();
const bearer = require('../middleware/bearer')

reservationRouter.post('/reservation',bearer,handelReservation)
reservationRouter.post('/test',bearer,handelStatus)
// send request
async function handelReservation(req,res){

const {userID,serviceID ,description,date}=req.body

const fineUser = await users.findAll({where:{id:userID}})

const createNewReservation = await reservation.create({
    date:date,
    userID:userID,
    serviceID:serviceID,
    description:description

})

res.status(201).send(createNewReservation)
}

// confirm or reject request

 async function handelStatus(req,res){
    res.send('Mohammad bbasil moahmmad alhlaj')
console.log("are you hear");
// const {status} = req.body
// const tokenId = req.user.id

// const allServicesUserProvider = await service.findAll({where:{userID:tokenId}})
// console.log('#######################',allServicesUserProvider);
// // const ser = await allServicesUserProvider.findOne({where:{id:}})

// const find = await reservation.findAll({where:{serviceID:allServicesUserProvider.id}})

// const findServiceId = await service.findOne({where:{id:ser}})

// const serviceProvider = await service.findOne({where:{userID:tokenId}})

// const serviceProvide = await reservation.findOne({where:{serviceID}})

}

module.exports = reservationRouter
