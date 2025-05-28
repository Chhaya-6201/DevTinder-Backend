const express=require('express');
const app=express();
app.use("/",(req,res)=>{
    res.send("hello chhaya to your new life from today on");
});
app.use("/chhaya",(req,res)=>{
    res.send("bubu");
})
app.listen(7777,()=>{
    console.log(`Server is listening on port 7777`);
    
})
