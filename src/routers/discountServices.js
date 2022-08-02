"use strict";
const express = require("express");

const { service } = require("../models/index-model");
const loger = require("../logger");
const bearer = require("../middleware/bearer");
const discountRouter = express.Router();

discountRouter.get("/discount", bearer, async (req, res) => {
  let discountRecords = await service.findAll({ where: { discount: "true" } });

  loger.info(`${req.user.username} has search on discount`, {
    timestamp: new Date().toString(),
  });

  res.status(200).json(discountRecords);
});
module.exports = discountRouter;
