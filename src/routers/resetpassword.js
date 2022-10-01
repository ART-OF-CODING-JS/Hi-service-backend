"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");
const resetPasswordRouter = express.Router();

const nodemailer = require("nodemailer");

const { users } = require("../models/index-model");
const SECRET = process.env.SECRET;

resetPasswordRouter.put("/resetpassword/:id/:token", resetpassword);
resetPasswordRouter.post("/sendpasswordlink", sendPasswordLink);

// in login page there is a button call (forget my password) to reset password .
async function resetpassword(req, res, next) {
  userId = parseInt(req.params.id);
  const { username, newPassword, email } = req.body;
  try {
    const foundUser = await users.findOne({ where: { username: username } });

    if (foundUser) {
      if (foundUser.id === userId) {
        if (email === foundUser.email) {
          const password = await bcrypt.hash(newPassword, 10);
          let updates = await foundUser.update({
            password: password,
          });
          res.send("The password updated successfully !");
          next();
        } else {
          res.send("The email it is not correct!");
        }
      } else {
        res.send("You are not Authenticate to change Password");
      }
    } else {
      res.send("The username is not correct !");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// send email Link For reset Password "/sendpasswordlink"
async function sendPasswordLink(req, res) {
  const { email } = req.body;
  if (!email) {
    res.json({ message: "Enter Your Email" });
    return;
  }

  try {
    const findUser = await users.findOne({ email: email });
    const token = jwt.sign({ id: findUser.id, email }, process.env.SECRET, { expiresIn: "5m" });

    const payload = {
      id: findUser.id,
      verifytoken: token,
      new: true,
    };

    const link = `http://localhost:3000/forgotpassword/${payload.id}/${payload.verifytoken}`;

    if (payload) {
      const mailInfo = {
        from: "hi-service-js@outlook.com", // sender address
        to: email,
        subject: "Sending Email For password Reset",
        text: `This Link Valid For 3 MINUTES[${link}]`,
      };

      let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "hi-service-js@outlook.com", // generated ethereal user
          pass: "hiservice123", // generated ethereal password
        },
      });

      transporter.sendMail(mailInfo, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res.status(201).json({ status: 201, message: "Email sent Successfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
}

module.exports = resetPasswordRouter;
