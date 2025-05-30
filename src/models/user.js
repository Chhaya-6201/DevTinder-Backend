const mongoose=require("mongoose");
const validator=require("validator");
//Keep your naming convention always camelCasing
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:" +value);
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
        default: "https://geographyandyou.com/images/user-profile.png",
    },
    about:{
        type:String,
        default:"This is default about of user "
    },
    skills:{
        type:[String],
    },
},
    {
        timestamps:true,
    },

);

//Created user Model
const userModel=mongoose.model("User",userSchema);

module.exports=userModel;