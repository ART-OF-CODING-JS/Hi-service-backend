"use strict";

async function signin(req, res, next) {
  res.status(200).json(req.user);
  next();
}
module.exports = signin;
