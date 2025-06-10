const express=require('express');
const app=express();
const connectDB=require("./config/database");
const cookieParser=require("cookie-parser");

//express provides middleware for reading the JSON data. now this middleware will be used for all our routes automatically
app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/requests");

app.use("/",authRouter,);
app.use("/",profileRouter);
app.use("/",requestRouter);

//First connect your database and then your app should start listening to server
connectDB().then(()=>{
console.log("Database connected successfully");
app.listen(7777,()=>{
    console.log(`Server is listening on port 7777`);   
})
}).catch(err=>{
console.log("Database cannot be connected");
});
