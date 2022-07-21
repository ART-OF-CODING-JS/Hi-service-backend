'use strict';

const { application } = require("express");

const logger = (req, res, next) => {
  console.log('REQUEST:', req.method, req.path);
  next();
};

module.exports = logger;
