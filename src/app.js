const express=require('express');
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");

//express provides middleware for reading the JSON data. now this middleware will be used for all our routes automatically
app.use(express.json());

app.post("/signUp",async(req,res)=>{

//console.log(req.body);

//we will create a new instance of our user model and we will add this data to our model
const user=new User(req.body);
    try{
await user.save();
res.send("User added successfully");
}catch(err){
    res.status(400).send("Error saving the user:"+err.message);
}
});

//Get user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const user=await User.find({
            emailId:userEmail
        });
        res.send(user);
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})

//FEED API-GET/Feed -get all the users from the database
app.get("/feed",async(req,res)=>{
 try{
  const users=await User.find({}); 
  res.send(users);
 }catch(err){
   res.status(400).send("Something went wrong");
 }
});

//Deleting the user from database
app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
 //const user=await User.findByIdAndDelete({_id:userId}); 
     const user=await User.findByIdAndDelete(userId); 
     res.send("User deleted successfully");
     }catch(err){
        res.status(400).send("Something went wrong");
    }
});

//Updating the user
app.patch("/user/:userId",async(req,res)=>{
    //in the coming videos i will use cookies, headers to fetch userId
     const userId=req.params?.userId;
     const data=req.body;
     try{
        const ALLOWED_UPDATES=["skills","photoURL","about","gender","age"];
     
    const isUpdateAllowed=Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
);
    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }
    if(data?.skills.length>10){
        throw new Error("Skills cannot be more than 10");
    }
  
      const user= await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
             runValidators:true, 
        });
        console.log(user);       
        res.send("User updated successfully");
     
     }
     catch(err){
        res.status(400).send("UPDATE FAILED "+err.message);
     } 
});


//First connect your database and then your app should start listening to server
connectDB().then(()=>{
console.log("Database connected successfully");
app.listen(7777,()=>{
    console.log(`Server is listening on port 7777`);   
})
}).catch(err=>{
console.log("Database cannot be connected");
});

