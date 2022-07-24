'use strict';

const express = require('express');
const router = express.Router();
const model = require('../models/index-model');
const bearer = require('../middleware/bearer')


//***Routers***

router.post('/addCredit',bearer,handelAddCredit)
router.post('/payment',bearer,handelPayment)



// ***To add new credit card ***
async function handelAddCredit(req,res){
try{
    const obj = req.body;
    const add = await dataModules.payment.create(obj)
    res.status(201).json(add);
}catch(err){
    console.log(err);
}
}



//*** pay to website to allow user post more services***
async function handelPayment(req,res){
try{
   const{cardNumber,cvv,expirationDate} = req.body;
// to validate card information ..
 const check = await  model.payment.findOne({where:[{cardNumber:cardNumber},
    {cvv:cvv},{expirationDate:expirationDate}]})
    // if we have error in card information
if(!check){
    res.status(404).send('Error')
}

const tokenId = req.user.id
const foundUser = await model.users.findOne({where:tokenId})

// to check if the price available in balance
if(check.balance >= 5){
    const newBalance = check.balance - 5
    const updateBalance = await check.update({balance:newBalance})
    const updateStatus = await foundUser.update({didPay:true})
    res.status(201).send('Payment successfully ')
}else{
    res.status(404).send('You do not have enough money !')
}


}catch(err){
    console.log(err);
}
}




//  ***called this function in api file inside create method ***..
model.service.paymentFunction = async function  (ID) {
 
 const numberService = await model.service.count({where:{userID:ID}})

    const foundUser = await model.users.findOne({where:ID})
   return {numberService:numberService,
    foundUser:foundUser};

 }



module.exports = router;