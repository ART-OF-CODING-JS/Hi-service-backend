'use strict';

const { Op } = require("sequelize");
const { company } = require("./index-model");

const services = (sequelize, DataTypes) => {
    const model = sequelize.define('services', {
        nameProfession: {
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
        userID: {
            type: DataTypes.INTEGER,
        }

    });

    // search by name profession
  model.searchService = async function (searchTerm) {
    const users = await model.findAll({
      where: {
        nameProfession:{ [Op.like]:'%' + searchTerm + '%'},
        
      },
      
   

    });

      return users;
  }
  return model;

}
module.exports = services;