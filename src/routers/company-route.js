`use strict`
const express = require('express');
const router = express.Router();
const {company} = require('../models/index-model');
const bearer = require('../middleware/bearer');

router.get('/company', handleGetAll);

async function handleGetAll(req, res) {
    let allRecords = await company.findAll();
    res.status(200).json(allRecords);
  }

  module.exports = router;