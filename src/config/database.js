const  mongoose = require("mongoose");


const connectDB = async ()=>{
    await  mongoose.connect("mongodb+srv://nayanank23:Nayaki23@nayananode.cr9nk.mongodb.net/Hello")
}

module.exports =connectDB ;	
