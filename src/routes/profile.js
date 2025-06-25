const express=require('express');
const {userAuth}=require("../middlewares/auth");
const profileRouter=express.Router();
const {validateEditProfileData}=require("../utils/validation");

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
    const user=req.user;
   if(!user){
    throw new Error("User does not exist");
   }
    res.send(user);
    }catch(err){
    res.status(400).send("ERROR: "+ err.message);
    }
    
});

// profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
// //First data validation & then data sanitization
// try{
// if(!validateEditProfileData(req)){
//     throw new Error("Invalid Edit Requests");
// }
// const loggedInUser=req.user;
// console.log(loggedInUser);

// }
// catch(err){
//     res.status(400).send("ERROR : "+err.message);
// }
// });


module.exports=profileRouter;