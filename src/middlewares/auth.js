 const adminAuth = (req,res,next)=>{
    const token= "xyz";
    const isAuthorised = token ==="xyz";
    console.log("admin auth is getting checked")
    if(!isAuthorised){
        res.status(401).send("Unauthorised user");
    }else{
        next();
    }
}
const userAuth = (req,res,next)=>{
    const token= "xyz";
    const isAuthorised = token ==="xyz";
    console.log("user auth is getting checked")
    if(!isAuthorised){
        res.status(401).send("Unauthorised user");
    }else{
        next();
    }
}
module.exports = {
    adminAuth,
    userAuth
}