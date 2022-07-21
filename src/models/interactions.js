'use strict';

const interactions = (sequelize, DataTypes) => sequelize.define('interactions', {
  addToFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
    required: false
  },
  rate: {
    type: DataTypes.INTEGER,
    required: false
  },
  userID: {
    type: DataTypes.INTEGER,
},
serviceID:{
  type: DataTypes.INTEGER,
}

});

module.exports = interactions;