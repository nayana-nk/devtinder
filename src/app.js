const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const cors= require("cors");
require('dotenv').config()

const app = express(); 
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

app.use("/", authRouter);
 app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Connect to DB and start server
connectDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Cannot connect to database!", err);
  });
