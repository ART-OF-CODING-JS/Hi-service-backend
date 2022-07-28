"use strict";

const { report } = require("../../models/index-model");
const express = require("express");
const reportRouter = express.Router();
const bearer = require("../../middleware/bearer");

reportRouter.post("/report", bearer, handleReport);

async function handleReport(req, res) {
  const { description, userID, serviceID } = req.body;

const tokenId = req.user.id
  const check = await report.findOne({where:[{userID:tokenId},{serviceID:serviceID}]})



if(!check ||check.status === 'confirm' || check.status === 'reject'){

    const createReport = await report.create({
      description: description,
      userID: userID,
      serviceID: serviceID,
    });
    
    res.status(201).send(createReport);
}else{
    res.status(404).send("You are already reported this service")
}

}

module.exports = reportRouter;
