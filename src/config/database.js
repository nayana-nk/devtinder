const  mongoose = require("mongoose");


const connectDB = async ()=>{
    await  mongoose.connect("DATABASE_PASSWORD")
}

module.exports =connectDB ;	