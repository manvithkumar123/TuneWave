const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    Username:{type:String,required:true},
    Password:{type:String,required:true},
    Email:{type:String,required:true},
    role:{
        type:String,
        enum:["user","doctor","manager"],
        default:"user"
    }
})
module.exports= mongoose.model("User",UserSchema)