'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const nodemailer = require("nodemailer");
require('dotenv').config();
const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email:{
      type: DataTypes.STRING,
    //   allowNull: false,
// we can add unique
    },
    password: {
      type: DataTypes.STRING,
    //   allowNu/ll: false,
    }, 
    gender: {
      type: DataTypes.STRING,
    //   allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
    //   allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
    //   allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    //   allowNull: false,
      // unique: true,
    },
    professions: {
      type: DataTypes.STRING,
       allowNull: true,
    },
    facebookId: {
      type: DataTypes.STRING,
     
    },
   
     Date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      didPay:{
     type: DataTypes.BOOLEAN,
     defaultValue: false
    },
   
    role: {
      type: DataTypes.ENUM('admin', 'writer', 'editor', 'user'),
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({
          username: this.username
        }, process.env.SECRET);
      }
    }, 
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = { 
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        }
        return acl[this.role];
      }
    }
  });
  model.beforeCreate=async function (user) {
    let hashedPass =await bcrypt.hash(user.password, 10);
    return hashedPass;
  };

  
 

// basic
  model.authenticateBasic = async function (username, password) {
    const user = await model.findOne({
      where: {
        username: username
      }
    });

    const valid = await bcrypt.compare(password, user.password);
// console.log("passsssssss",password,user.password);
    if (valid) {
      return user;
    }
    throw new Error('Invalid User');
  }

// Bearer
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
     let y = parsedToken.username;
      const user =  await this.findOne({
        where: {
          username: parsedToken.username
        }
      });
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  }

  return model;
}

module.exports = userSchema;