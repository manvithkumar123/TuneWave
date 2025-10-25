const mongoose=require("mongoose")

const SongSchema=mongoose.Schema({
    songUrl:String,
    coverUrl:String,
    Songname:String,
    Artist:String,
    Genere:String,
    Language:String,
    Songtype:{
        type:String,
        enum:["General","Promote"],
        default:"General"
    }
})

module.exports= mongoose.model("song",SongSchema)