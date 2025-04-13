const express = require ("express");
const { validateSignupData } = require("../utils/validation");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const jwt = require ("jsonwebtoken");


// Signup
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
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


module.exports= authRouter;