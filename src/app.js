const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./models/user")
const app = express(); // No need for `new`

app.use(express.json());
app.post("/signup", async (req,res)=>{
    const user = new userModel (req.body)

    //creating new instance of userModel model
    // const user = new userModel({
    //     firstName:"Kumarn",
    //     lastName:"nayana",
    //     emailId:"kumarcn@gmail.com",
    //     password:"Kumar123",
    //     age:30
    // })
 // await user.save();
 try{
    await user.save();
    res.send("user added succesfully")
 } catch(err){
    res.status(400).send("Error saving user:" + err.message)
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
