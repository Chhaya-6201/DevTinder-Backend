const mongoose=require('mongoose');
//This is all we need for connecting to the cluster
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://ctyagi:j3Gdo1f5Oc6WiU32@cluster-devtinder.l2xbnfv.mongodb.net/devTinder"
)
};

module.exports=connectDB;

