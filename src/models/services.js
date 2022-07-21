'use strict';

const services = (sequelize, DataTypes) => sequelize.define('services', {
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
    },
 
});

module.exports = services;