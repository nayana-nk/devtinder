const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
const jwt = require ("jsonwebtoken");

const app = express();
app.use(cookieParser());
app.use(express.json());

// Signup
app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await userModel.findOne({ emailId });

    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token =  await user.getJWT();
    res.cookie("token", token, {expires: new Date(Date.now()+ 8 * 3600000)},);
    res.send("Logged in successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Profile - Protected route
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
app.post("/sendConnectionRequest", userAuth, async(req, res)=>{
  try{
console.log("sending connection request")
res.send(`connection request sent by ${req.user.firstName}`);
  }catch{
  throw new Error(res.status(400).send("Error:" + err.message))
  }
})






// Connect to DB and start server
connectDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Cannot connect to database!", err);
  });
