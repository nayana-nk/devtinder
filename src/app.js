const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./models/user");
const { ReturnDocument } = require("mongodb");
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
//delete api - delete user  from database
app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  res.send("User deleted succesfully");
  try{
   const userid = await userModel.findByIdAndDelete(userId)
  }
  catch(err){
  res.status(400).send("Something went wrong")
}
})
// find user and update data by user id
app.patch("/user",async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body

  try{
   const userdata = await userModel.findByIdAndUpdate(userId, data);
     res.send("Updated user succesfully");
  }
  catch(err){
  res.status(400).send("Something went wrong")
}
})
//find user and update the data by using email Id
app.patch("/user",async(req,res)=>{
  const email = req.body.emailId;
  const data = req.body


  try{
    const allowedUpdates = ["userId", "skills", "about","gender","age"]
    const isUpdateAllowed = Object.keys(data).every((k)=> allowedUpdates.imcludes(k));
    if( !isUpdateAllowed){throw new Error('update not allowed')}
    if(data.skills.length > 10){ throw new Error("only 10 skills valid")}
   const userdata = await userModel.updateOne({ emailId: email }, data,{  returnDocument:"after",
   runValidators:true }); 
  
     res.send("Updated user using email succesfully");
  }
  catch(err){
  res.status(400).send("Something went wrong")
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
