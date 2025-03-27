const express = require ("express");
const app = new express();

const { adminAuth,userAuth } = require ("./middlewares/auth");

 app.use("/admin",adminAuth);


 app.post("/user/login",(req,res,next) =>{
    res.send(" user login")
 })
 app.use("/user/data",userAuth, (req,res,next)=>{
    res.send("user details");
 })

 app.use("/user",userAuth, (req,res,next)=>{
    res.send("user authenticated");
 })

app.get("/admin/getAlldata", (req,res)=>{
    res.send("all data sent")
})
app.get("/admin/deleteUser",(req,res,next)=>{
    try{
    throw new Error ("gdhadpsoxjhdbqdcx")
    res.send("user deleted")}
    catch (err) {
        res.status(500).send("something went wrong contact support ")
    }
})
//eror handling
// app.use("/",(err,req,res,next) =>{
//     if(err){
//         res.status(500).send(err.message)
//     }
// })
app.listen(3000,()=>{
    console.log("server is listening sucessfully on port 3000")
});