const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require ("validator");
const app = express(); 

app.use(express.json());


app.post("/signup", async (req, res) => {
  try {
    // validate the data
    validateSignupData(req);

    const {firstName, lastName, emailId,password}= req?.body ;
    //encrypt password
    const passwordHash = await bcrypt.hash(password,10 )
    console.log(passwordHash)


    const user = new userModel({firstName,lastName,emailId, password:passwordHash});
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
app.post ("/login", async(req, res)=>{
  try{
 const {emailId, password} = req.body;

 const user = await userModel.findOne({emailId:emailId})
 if(!user){
  throw new Error("Invalid credentials");
 }
 const isPasswordvalid = await bcrypt.compare(password,user.password );
 if(isPasswordvalid){
  res.send("Logged in sucessfully");
 } else{
  throw new Error("Invalid credentials");

 }
  }
  catch(err){
    res.status(400).send("Error: " +err.message);

}})

app.get("/user", async (req, res) => {
  try {
    const users = await userModel.find({ emailId: req.body.emailId });
    if (users.length === 0) {
      res.status(404).send("user not found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong", +err.message);
  }
});

//feed api - get  /feed - get all the users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find({});
    if (users.length === 0) {
      res.status(404).send("user not found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong", +err.message);
  }
});

//delete api - delete user  from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  res.send("User deleted successfully");
  try {
    const userid = await userModel.findByIdAndDelete(userId);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// find user and update data by user id
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const userdata = await userModel.findByIdAndUpdate(userId, data);
    res.send("Updated user successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//find user and update the data by using email Id
app.patch("/user", async (req, res) => {
  const email = req.body.emailId;
  const data = req.body;

  try {
    const allowedUpdates = ["userId", "skills", "about", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("only 10 skills valid");
    }
    const userdata = await userModel.updateOne({ emailId: email }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("Updated user using email successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server is listening successfully on port 3000");
    });
  })
  .catch((err) => {
    console.error("Cannot connect to database!!", err);
  });
