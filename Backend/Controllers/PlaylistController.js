const path = require("path");
const LikedSongSchema = require("../Database/LikedSongs.js");

module.exports.LikeSong = async (req, res) => {
    try {
      const userId = req.user._id;
      const { songId } = req.params;
      if (!songId) {
        return res.status(400).json({ output: "songId is required" });
      }
      await LikedSongSchema.updateOne(
        { user: userId },
        { $addToSet: { songs: songId } },
        { upsert: true }
      );
  
      res.status(200).json({ output: "Song added", status: "Success" });
    } catch (error) {
      console.log("Error adding liked song:", error);
      res.status(504).json({output:error });
    }
  };

module.exports.DeleteLikeSong=async(req,res)=>{
   try{ const userId = req.user._id;
    const { songId } = req.params;
    if (!songId) {
        return res.status(400).json({ output: "songId is required" });
    }
    else{
        const result=await LikedSongSchema.updateOne(
            {user:userId},
            { $pull:{songs:songId}}
        )

    if (result.modifiedCount === 0) {
        return res.status(200).json({ output: "Song not found in liked songs" });
      }
      else{
        res.status(200).json({ output: "Song removed from liked songs", status: "Success" });
      }
    }}catch(error){
        console.log(error)
    }
}
module.exports.GetLikeSongs=async(req,res)=>{
  try{
    const userId=req.user._id;
    const likedSongs=await LikedSongSchema.findOne({user:userId}).populate({
      path:"songs",
      select:"songUrl coverUrl Songname Artist",
    });
    if (!likedSongs || likedSongs.songs.length === 0) {
      return res.status(200).json({ output: "No liked songs found", songs: [] });
    }
    return res.status(200).json({ output: "Liked songs fetched", songs: likedSongs.songs ,status:"Success"});
  }catch(error){
    return res.status(500).json({ output: "Internal server error" });
  }
}