const express = require("express");
const { validateSignupData } = require("../utils/validation");
const userModel = require("../models/user");
const authRouter = express.Router();

// Signup Route
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Create a new user; password hashing is done via the pre-save hook in the model
    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Login Route
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await userModel.findOne({ emailId });
    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = user.getJWT();
    res.cookie("token", token, {
      httpOnly: true, // Improves security by preventing client-side script access
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send("Logged in successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = authRouter;
