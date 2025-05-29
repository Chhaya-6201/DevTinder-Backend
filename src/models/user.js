const mongoose=require("mongoose");
//Keep your naming convention always camelCasing
const userSchema= new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
});

//Created user Model
const userModel=mongoose.model("User",userSchema);

module.exports=userModel;