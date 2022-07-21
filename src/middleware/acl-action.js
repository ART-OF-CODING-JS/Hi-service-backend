'use strict';
module.exports=(action)=>(req,res,next)=>{
    try {
        if (req.user.actions.includes(action)) {
            next();
        } else {
            next('access denied')
        }
    } catch (e) {

    }
}