const express = require ("express");
const app = new express();

//this will match all the HTTP method  API calls to /test
    app.use("/test", (req, res) => {
        res.send("test Server started ")
    })
    // this will call only  handle GET call to /user
    app.get("/user",(req,res)=>{
     res.send({firstName: "Nayana",lastName:"Kiran"})
    })
    app.post("/user",(req,res)=>{
        //saving data to db
        res.send("data successfully saved")
       })
    app.delete("/user",(req,res)=>{
        res.send("deleted user sucessfully")
    })
    app.patch("/user",(req,res)=>{
        res.send("patched user sucessfully");
    })
    app.put("/user",(req,res)=>{
        res.send("updated user data");
    })
    //dynamic routes
    app.get("/user/:userId/:password",(req,res)=>{
        console.log(req.params);
        res.send({firstName:"Nayana",lastName:"Kumar"})
    })
    //playing with * ,? ,/regex/
    app.get("/user/*fly",(req,res)=>{
        console.log(req.query);
        res.send({firstName:"Nayana",lastName:"Kumar"})
    })
    //b is optional abc and ac also runs
    app.get("/user/ab?c",(req,res)=>{
        console.log(req.query);
        res.send({firstName:"Nayana",lastName:"Kumar"})
    })
    //can add anything after ab last should be c
    app.get("/user/ab+c",(req,res)=>{
        console.log(req.query);
        res.send({firstName:"Nayana",lastName:"Kumar"})
    })
    //can bc is optional abcd , ad runs
    app.get("/user/a(bc)?d",(req,res)=>{
        console.log(req.query);
        res.send({firstName:"Nayana",lastName:"Kumar"})
    })
  
app.listen(3000,()=>{
    console.log("server is listening sucessfully on port 3000")
});