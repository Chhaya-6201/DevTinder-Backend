const express=require('express');
const User=require("../models/user");
const {validateSignUpData}=require("../utils/validation");
const bcrypt=require("bcrypt");

const authRouter=express.Router();

authRouter.post("/signUp",async(req,res)=>{
try{
//Validation of the data
validateSignUpData(req);
//Encrypt the password
const{firstName,lastName,emailId,password}=req.body;

const passwordHash=await bcrypt.hash(password,10);
console.log(passwordHash);

//we will create a new instance of our user model and we will add this data to our model
const user=new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash,
    
});
    
await user.save();
res.send("User added successfully");
}
catch(err){
    res.status(400).send("Error:"+err.message);
}
});


authRouter.post("/login",async(req,res)=>{
    try{
    const{emailId,password}=req.body;
   
    const user=await User.findOne({emailId:emailId});
    if(!user){
        throw new Error("EmailId is not present in DB");
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(isPasswordValid){

       const token=await user.getJWT();
    
       res.cookie("token",token,{
        expires:new Date(Date.now()+8*3600000),
       });

        res.send("Login successfull");
    }
    else{
        throw new Error("Invalid credentials");
    } 
    }catch(err){
      res.status(400).send("ERROR "+err.message);
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("Logout successfully");
})

module.exports=authRouter;