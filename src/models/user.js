const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
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
        enum:{
            values:["male","female","other"],
            message:`{VALUE} is not a valid gender type`
        },
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender data is not valid");
        //     }
        // },
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

//this keyword does not work in arrow function
userSchema.methods.getJWT=async function(){
   const user=this;

   const token=await jwt.sign({_id:user._id},"DEV@Tinder$790",{
            expiresIn:"1d",
    });
    return token;
};

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
}
 
//Created user Model
const userModel=mongoose.model("User",userSchema);

module.exports=userModel;