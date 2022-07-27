'use strict';

const express = require('express');
const router = express.Router();
const MyServicesRouter = express.Router();
const {service} = require('../models/index-model');
const bearer = require('../middleware/bearer');

MyServicesRouter.get('/myServices',bearer,handelMyServices)

async function handelMyServices(req,res){

const token = req.user.id

const myServices = await service.findAll({where:{userID:token}})

res.status(200).send(myServices)

}
module.exports = MyServicesRouter