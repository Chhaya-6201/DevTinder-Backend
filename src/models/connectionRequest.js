//This model will define the connection request between 2 users

const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        //You create enum at a place where you restrict the user for some values
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        },      
    },
},
    {
    timeStamps:true
    }
)

const ConnectionRequestModel=new mongoose.model(
    "ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequestModel;