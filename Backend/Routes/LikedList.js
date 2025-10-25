const express = require('express');
const router = express.Router();
const isLoggedin = require("../MiddleWares/isLoggedin.js");
const { LikeSong, DeleteLikeSong, GetLikeSongs } = require('../Controllers/PlaylistController.js');

router.post("/like/:songId",isLoggedin,LikeSong);
router.post("/Dislike/:songId",isLoggedin,DeleteLikeSong);
router.get("/getsongs",isLoggedin,GetLikeSongs);

module.exports = router;