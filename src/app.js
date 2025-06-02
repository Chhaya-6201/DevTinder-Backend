const express=require('express');
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");

//express provides middleware for reading the JSON data. now this middleware will be used for all our routes automatically
app.use(express.json());
app.use(cookieParser());

app.post("/signUp",async(req,res)=>{
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

app.post("/login",async(req,res)=>{
    try{
    const{emailId,password}=req.body;
   
    const user=await User.findOne({emailId:emailId});
    if(!user){
        throw new Error("EmailId is not present in DB");
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(isPasswordValid){

    //Create a JWT Token

     const token=await jwt.sign({_id:user._id},"DEV@Tinder$790",{
        expiresIn:"1d",
     });
    //   console.log(token);
      
    /*Add the token to cookie and send the response back 
    to the user*/
      
       res.cookie("token",token,{
        expires:new Date(Date.now()+8*3600000),
       });

        res.send("Login successfull");
    }
    else{
        throw new Error("Password not correct");
    } 
    }catch(err){
      res.status(400).send("ERROR "+err.message);
    }
})

app.get("/profile",userAuth,async(req,res)=>{
    try{
    const user=req.user;
   if(!user){
    throw new Error("User does not exist");
   }
    res.send(user);
    }catch(err){
    res.status(400).send("ERROR: "+err.message);
    }
    
});

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    
    const user=req.user;
    //Sending a connection request
    console.log("Sending a connection request");
 
    res.send(user.firstName+ " sent the connection request!");
})



//Get user by email
// app.get("/user",userAuth,async(req,res)=>{
//     const userEmail=req.body.emailId;
//     try{
//         const user=await User.find({
//             emailId:userEmail
//         });
//         res.send(user);
//     }catch(err){
//         res.status(400).send("Something went wrong");
//     }
// })

//FEED API-GET/Feed -get all the users from the database
// app.get("/feed",async(req,res)=>{
//  try{
//   const users=await User.find({}); 
//   res.send(users);
//  }catch(err){
//    res.status(400).send("Something went wrong");
//  }
// });

//Deleting the user from database
// app.delete("/user",async(req,res)=>{
//     const userId=req.body.userId;
//     try{
//  //const user=await User.findByIdAndDelete({_id:userId}); 
//      const user=await User.findByIdAndDelete(userId); 
//      res.send("User deleted successfully");
//      }catch(err){
//         res.status(400).send("Something went wrong");
//     }
// });

//Updating the user
// app.patch("/user/:userId",async(req,res)=>{
//     //in the coming videos i will use cookies, headers to fetch userId
//      const userId=req.params?.userId;
//      const data=req.body;
//      try{
//         const ALLOWED_UPDATES=["skills","photoURL","about","gender","age"];
     
//     const isUpdateAllowed=Object.keys(data).every((k)=>
//         ALLOWED_UPDATES.includes(k)
// );
//     if(!isUpdateAllowed){
//         throw new Error("Update not allowed");
//     }
//     if(data?.skills.length>10){
//         throw new Error("Skills cannot be more than 10");
//     }
  
//       const user= await User.findByIdAndUpdate({_id:userId},data,{
//             returnDocument:"after",
//              runValidators:true, 
//         });
//         console.log(user);       
//         res.send("User updated successfully");
     
//      }
//      catch(err){
//         res.status(400).send("UPDATE FAILED "+err.message);
//      } 
// });


//First connect your database and then your app should start listening to server
connectDB().then(()=>{
console.log("Database connected successfully");
app.listen(7777,()=>{
    console.log(`Server is listening on port 7777`);   
})
}).catch(err=>{
console.log("Database cannot be connected");
});

