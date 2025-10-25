const express = require('express');
const { upload, uploadSong,GetSongs,GetSongUrl, GetArtistSong, GetSongNames } = require('../Controllers/UploadSong');
const Songmodel=require("../Database/UploadSongs")
const router = express.Router();

router.post('/upload-song', upload, uploadSong);
router.post("/delete-song/:id", async (req, res) => {
    try {
      const Songid = req.params.id;
      const deletingsong = await Songmodel.findByIdAndDelete(Songid);
  
      if (!deletingsong) {
        return res.status(404).json({ message: "Song not found" });
      }
      res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting song", error });
    }
});
router.get("/Get-songs",GetSongs)
router.get("/Song-names",GetSongNames)
router.get("/Artist/:ArtistName",GetArtistSong)
router.get("/:id",GetSongUrl)

module.exports = router;