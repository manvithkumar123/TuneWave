const mongoose = require("mongoose");

const FeedBackSchema=mongoose.Schema({
    Username:{
        type:String,
        require:true,
    },
    FeedBack:{
        type:String,
        require:true,
    },
    Email:{
        type:String,
        require:true,
    }
})
module.exports= mongoose.model("FeedBack",FeedBackSchema)