const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const cookieParser = require("cookie-parser");

const app = express(); 

app.use(cookieParser());
app.use(express.json());

app.use("/", authRouter);
 app.use("/", profileRouter);
// app.use("/", requestRouter);

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
