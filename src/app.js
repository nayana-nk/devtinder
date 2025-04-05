const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./models/user")
const app = express(); // No need for `new`

app.use(express.json());

app.post("/signup", async (req,res)=>{
    const user = new userModel (req.body)
  //creating new instance of userModel model
 try{
    await user.save();
    res.send("user added succesfully")
 } catch(err){
    res.status(400).send("Error saving user:" + err.message)
 }
 
})
app.get("/user",async (req,res)=>{
   
    try{
      const users=  await userModel.find({emailId : req.body.emailId});
      if(users.length === 0){
        res.status(404).send("user not found")
      }
      res.send(users);
      
    }
    catch(err){
        res.status(400).send("Something went wrong", + err.message)
    }

})
//feed api - get  /feed - get all the users from database
app.get("/feed",async (req,res)=>{
    try{
        const users= await userModel.find({});
        if(users.length === 0){
          res.status(404).send("user not found")
        }
        res.send(users);
        
      }
      catch(err){
          res.status(400).send("Something went wrong", + err.message)
      }

})


connectDB().then(() => {
    console.log("Database connection successful");

   app.listen(3000, () => {
        console.log("Server is listening successfully on port 3000");
    });

}).catch((err) => {
    console.error("Cannot connect to database!!", err);
});
