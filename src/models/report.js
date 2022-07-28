"use strict";

const report = (sequelize, DataTypes) =>
  sequelize.define("report", {
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

module.exports = report;
