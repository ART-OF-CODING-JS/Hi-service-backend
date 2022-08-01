"use strict";

const reservation = (sequelize, DataTypes) =>
  sequelize.define("reservation", {
    date: {
      type: DataTypes.DATE,
    },
    // time: {
    //   type: DataTypes.TIME,
    // },
    description: {
      type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('confirm', 'reject'),
     
      },
    userID: {
      type: DataTypes.INTEGER,
    },
    serviceID: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = reservation;
