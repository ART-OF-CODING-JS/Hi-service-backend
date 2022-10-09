"use strict";

const { Op } = require("sequelize");
const { company } = require("./index-model");

const services = (sequelize, DataTypes) => {
  const model = sequelize.define("services", {
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      // We can add unique Number
    },
    discount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reportsCounter:{
      type:DataTypes.INTEGER,
      defaultValue:0

    },
    status: {
      type: DataTypes.ENUM('confirm', 'reject'),
   
    },
    userID: {
      type: DataTypes.INTEGER,
    },
  });

  // search by title
  model.searchService = async function (searchTerm) {
    const users = await model.findAll({
      where: 
      [  {title: { [Op.like]: "%" + searchTerm + "%" }},{status: "confirm"}],
   
    });

    return users;
  };
  model.searchCity = async function (searchCity) {
    const search = await model.findAll({
      where:
    [   { city: { [Op.like]: "%" + searchCity + "%" }},{status: "confirm" }]
    });

    return search;
  };
  return model;
};
module.exports = services;
