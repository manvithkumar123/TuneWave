const mongoose = require("mongoose");

const LikedSongSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "song" }]
});

module.exports = mongoose.model("LikedSong", LikedSongSchema);
