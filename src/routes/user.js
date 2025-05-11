const express = require("express");
const userRouter =express.Router();
const {userAuth} = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName age gender about skills";

//get all the pending connection requests  of the loggedinuser
userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
  
    try{

        const loggedInUser= req.user;
        const connectionRequests =  await connectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId", USER_SAFE_DATA)
        // .populate("fromUserId",["firstName","lastName"]);
        res.json({
            message:"connection requests pending",
            data:connectionRequests,
        });
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})
userRouter.get("/user/connections", userAuth, async (req, res)=>{
    try{
        const loggedInUser= req.user;
     
    const connectionRequests = await connectionRequest.find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);
  
    //   console.log(connectionRequests);
  
      const data = connectionRequests.map((row) => {
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return row.toUserId;
        }
        return row.fromUserId;
      });
  
      res.json({ data });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });
module.exports = userRouter;