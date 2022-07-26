`use strict`
const company = (sequelize, DataTypes) => sequelize.define('company', {
    companyName: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
//     email:{
//         type: DataTypes.STRING,
//       //   allowNull: false,
//   // we can add unique
    //   },
    //   password: {
    //     type: DataTypes.STRING,
    //   //   allowNu/ll: false,
    //   }, 
    services: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      required: false
    },
    // phoneNumber: {
    //   type: DataTypes.INTEGER,
    //   required: false
    // },
//     city: {
//       type: DataTypes.STRING,
//   },
  location:{
    type: DataTypes.STRING,
  },
  commercialRegister:{
    type: DataTypes.STRING,
  }
  
  
  });
  
  module.exports = company;