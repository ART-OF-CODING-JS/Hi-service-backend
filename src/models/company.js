`use strict`
const company = (sequelize, DataTypes) => sequelize.define('company', {
    companyName: {
      type: DataTypes.STRING,
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    owner: {
      type: DataTypes.STRING,
       
    },

  location:{
    type: DataTypes.STRING,
  },
  commercialRegister:{
    type: DataTypes.STRING,
  }
  
  
  });
  
  module.exports = company;