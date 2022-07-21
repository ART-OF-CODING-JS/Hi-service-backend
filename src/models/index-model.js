'use strict';

require("dotenv").config()


const { Sequelize, DataTypes } = require('sequelize');

// Tables
const usersModel = require('./users');

const serviceModel = require('./services');
const interactionsModel = require('./interactions');




const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};
const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const service = serviceModel(sequelize, DataTypes);
const interactions = interactionsModel(sequelize, DataTypes);
const users = usersModel(sequelize,DataTypes)


//....relationships one to many........
// service
users.hasMany(service,{
  foreignKey: "userID",
  sourceKey: "id"
});
service.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});


// interactions
users.hasMany(interactions,{
  foreignKey: "userID",
  sourceKey: "id"
});

interactions.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});

// relations between service and interactions
service.hasMany(interactions,{
  foreignKey: "serviceID",
  targetKey: "id"
})
interactions.belongsTo(service, {
  foreignKey: "serviceID",
  targetKey: "id",
});



// interactions with service




module.exports = {
  db: sequelize,
  users: users,
  service: service,
  interactions: interactions ,
};