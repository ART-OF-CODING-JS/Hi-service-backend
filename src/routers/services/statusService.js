"use strict";

const express = require("express");
const StatusRouter = express.Router();
const { service } = require("../../models/index-model");
const bearer = require("../../middleware/bearer");


StatusRouter.get("/allServiceAdmin", bearer, handleGetAlls);
StatusRouter.put("/allServiceAdmin/:id", bearer, handleUpdateStatus);

async function handleGetAlls(req, res) {
  console.log(req.user.role === "admin");
  if (req.user.role === "admin") {
    let allRecords = await service.findAll();

    res.status(200).json(allRecords);
  }else{
    res.status(404).send('Access denied')
  }
}



async function handleUpdateStatus(req, res) {
const {id} = req.params;
const {status} =req.body;
    if (req.user.role === "admin") {
      const findService = await service.findOne({where:{id:id}})
        const updateStatus = await  findService.update({status:status})
        res.status(201).send('Update successfully')

    }else{
      res.status(404).send('Access denied')
    }
  }


module.exports = StatusRouter;
