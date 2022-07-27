"use strict";

const paymentInfo = (sequelize, DataTypes) =>
  sequelize.define("paymentInfo", {
    cardNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = paymentInfo;
