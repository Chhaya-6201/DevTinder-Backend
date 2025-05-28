const express=require('express');
const app=express();
const connectDB=require("./config/database");

//First connect your database and then your app should start listening to server
connectDB().then(()=>{
console.log("Database connected successfully");
app.listen(7777,()=>{
    console.log(`Server is listening on port 7777`);   
})
}).catch(err=>{
console.log("Database cannot be connected");
});

