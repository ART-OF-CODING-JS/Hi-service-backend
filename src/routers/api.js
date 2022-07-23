'use strict';

const express = require('express');
const routerV2 = express.Router();

const dataModules = require('../models/index-model');
const bearer = require('../middleware/bearer');
const acl = require('../middleware/acl-action');
const model= require('../routers/updateinfo')
// const handlerLogOut = require('../routers/logout')
const resetpassword = require('../routers/resetpassword')
// The sorting very important 

// update username and password .
routerV2.put('/change/username/:id',bearer,model.updateUsername)
routerV2.put('/change/password/:id',bearer,model.updatePassword)

// logOut it's not work
// routerV2.get('/logout',bearer,handlerLogOut)


// reset password
routerV2.put('/resetpassword',resetpassword)

// models
routerV2.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName] ) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});


// Before/:model >>>>> /api/v2/model
routerV2.get('/:model',bearer,acl('read'), handleGetAll); 
routerV2.get('/:model/:id',bearer,acl('read'),  handleGetOne); 
 routerV2.post('/:model',bearer,  handleCreate); 
routerV2.put('/:model/:id', bearer, handleUpdate);
routerV2.delete('/:model/:id',bearer,  handleDelete);

 // Get All Records
// just admin can get all users
async function handleGetAll(req, res) {
  const knexInstance = req.app.get("db");
  
  if((req.user.role === 'admin') ||( req.model !== dataModules.users )){
    let allRecords = await req.model.findAll();
    res.status(200).json(allRecords);
  }else{
    res.send('Access denied')
  }
};

 // Get one Records
 // admin just can get one user
async function handleGetOne(req, res) {
  const id = req.params.id ;
  if((req.user.role === 'admin') ||( req.model !== dataModules.users ) ){
 let readOne = await req.model.findOne({where:{id:id}});
 res.status(200).json(readOne);
}else{
  res.send('Access denied')
}
}

 // Create records

async function handleCreate(req, res) {
  if((req.user.role === 'admin') ||( req.model !== dataModules.users ) ){
    const obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);

  }else{
    res.status(404).send('Access denied')
  }
}

// Update records
// user can update on his service or... but not allow edit on service users.
// admin can edit on all of the services .....
async function handleUpdate(req, res) {
  const tokenId = req.user.id;
  const role = req.user.role;
  const newUpdate= req.body

  let ID = req.params.id;
    const found = await  req.model.findOne({where:{id:ID}}) 
  if( (req.user.role === 'admin') ||( req.model !== dataModules.users )){


    if ((found && tokenId === found.userID ) || (role == "admin" && found)) {
       let updates = await found.update(newUpdate)
       res.status(201).json(updates)
    }else{
       res.status(404).send("can't find the user !")
    }
  }else{
    res.status(404).send('Access denied')
  }
}


// Delete records
// The user can delete own service or... only 
// The user doesn't have access users
async function handleDelete(req, res) {

  const tokenId = req.user.id;
  const role = req.user.role;
  const ID = req.params.id
// when admin update user the password it's not hashed
try{
  if( (role === 'admin') ||( req.model !== dataModules.users ) ){
  const foundUser = await req.model.findOne({where:{id:ID}})

  if ((tokenId === foundUser.userID)|| (role === 'admin') )  {

    const deletes = await foundUser.destroy(foundUser.id)
    res.status(204).send('Deleted successfully')
  }else{
    res.status(404).send('Access denied')
  }

  }else{
    res.status(404).send('Access denied')
  }
  
}catch(err){
  res.status(404).send(err)
}
}




module.exports = routerV2;