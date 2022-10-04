"use strict";

require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

// Tables
const usersModel = require("./users");
const contactUsModel = require("./contactus");
const serviceModel = require("./services");
const interactionsModel = require("./interactions");
const paymentModel = require("./credit card");
const companyModel = require("./company");
const reservationModel = require("./Reservation");
const reportModel = require("./report");
const commentsModel = require("./comments");


const DATABASE_URL = process.env.NODE_ENV === "test" ? "sqlite::memory" : process.env.DATABASE_URL;

const DATABASE_CONFIG =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const service = serviceModel(sequelize, DataTypes);
const interactions = interactionsModel(sequelize, DataTypes);
const users = usersModel(sequelize, DataTypes);
const payment = paymentModel(sequelize, DataTypes);
const contactUs = contactUsModel(sequelize, DataTypes);
const company = companyModel(sequelize, DataTypes);
const reservation = reservationModel(sequelize, DataTypes);
const report = reportModel(sequelize, DataTypes);
const comments = commentsModel(sequelize, DataTypes);

//....relationships one to many........
// service
users.hasMany(service, {
  foreignKey: "userID",
  sourceKey: "id",
});
service.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});

// interactions
users.hasMany(interactions, {
  foreignKey: "userID",
  sourceKey: "id",
});

interactions.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});

// relations between service and interactions
service.hasMany(interactions, {
  foreignKey: "serviceID",
  targetKey: "id",
});
interactions.belongsTo(service, {
  foreignKey: "serviceID",
  targetKey: "id",
});

// ****reservation ***
// relation between reservation and users
users.hasMany(reservation, {
  foreignKey: "userID",
  targetKey: "id",
});
reservation.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});

// relation between reservation and services

service.hasMany(reservation, {
  foreignKey: "serviceID",
  targetKey: "id",
});
reservation.belongsTo(service, {
  foreignKey: "serviceID",
  targetKey: "id",
});

// **** report*****
 // relation between report and userID and ServiceID
 
 users.hasMany(report, {
  foreignKey: "userID",
  targetKey: "id",
});
report.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});



service.hasMany(report, {
  foreignKey: "serviceID",
  targetKey: "id",
});
report.belongsTo(service, {
  foreignKey: "serviceID",
  targetKey: "id",
});

//***********comments************ */
users.hasMany(comments, {
  foreignKey: "userID",
  targetKey: "id",
});
comments.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});



service.hasMany(comments, {
  foreignKey: "serviceID",
  targetKey: "id",
});
comments.belongsTo(service, {
  foreignKey: "serviceID",
  targetKey: "id",
});


module.exports = {
  db: sequelize,
  users: users,
  service: service,
  interactions: interactions,
  payment: payment,
  contactUs: contactUs,
  company: company,
  reservation:reservation,
  report:report,
  comments:comments,
};
