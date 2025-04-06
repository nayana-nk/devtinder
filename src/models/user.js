
const mongoose = require("mongoose");
const  userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:8
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },gender:{
        type:String,
        validate(value){
            if( ! ["male","female","other"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    skills:{
        type:[String],
        default:["react","node"]

    },
    about:{
        type:String,
        default:"This is the default about of the user"
    }
}, {timestamps: true })
const user = mongoose.model("User",userSchema);
module.exports = user;