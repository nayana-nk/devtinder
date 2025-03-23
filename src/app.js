const express = require ("express");
const app = new express();
app.use((req,res)=>{
res.send("hello from nayana's express server")
})
app.listen(3000,()=>{
    console.log("server is listening sucessfully on port 3000")
});