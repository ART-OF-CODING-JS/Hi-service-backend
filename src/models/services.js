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
    userID: {
      type: DataTypes.INTEGER,
    },
  });

  // search by name profession
  model.searchService = async function (searchTerm) {
    const users = await model.findAll({
      where: {
        title: { [Op.like]: "%" + searchTerm + "%" },
      },
    });

    return users;
  };
  return model;
};
module.exports = services;
