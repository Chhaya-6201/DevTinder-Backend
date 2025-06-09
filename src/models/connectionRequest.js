//This model will define the connection request between 2 users

const mongoose=require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
 fromUserId : {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
 },
 toUserId:{
     type:mongoose.Schema.Types.ObjectId,
     required:true,
 },
 status:{
    type:String,
    required:true,
    // You can create a enum at a place where you want to restrict user from some values
    enum:{
    values:["ignore","interested","accepted","rejected"],
    message:`{VALUE} is not supported`
    }
 }
},{
    timestamps:true,
});

const ConnectionRequestModel=new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema);
    
module.exports=ConnectionRequestModel;