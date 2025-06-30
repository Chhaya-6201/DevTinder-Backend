const express=require("express");
const requestRouter=express.Router();
const userAuth=require("../middlewares/auth");

requestRouter.post("request/send/interested/:toUserId",
  userAuth,
  async(req,res)=>{
  try{
  // Logged in user and also fromUser
   const fromUser=req.user;
  }catch(err){
  res.status(400).send("ERROR : "+err.message);
  }
  res.send(user.firstName+ "sent the connection request");


});

module.exports =requestRouter;