const  mongoose = require("mongoose");


const connectDB = async ()=>{
    await  mongoose.connect("DB_PASSWORD")
}

module.exports =connectDB ;	
