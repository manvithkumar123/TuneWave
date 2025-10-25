const multer = require('multer');
const cloudinary = require('../Cloudinary.js');
const SongModule = require('../Database/UploadSongs.js');
const streamifier = require('streamifier');

const storage = multer.memoryStorage();
const upload = multer().fields([
  { name: 'song', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
]);

const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

const uploadSong = async (req, res) => {
  try {
    const { Songname, Artist, Genere, Language,Songtype } = req.body;

    if (!req.files || !req.files.song) {
      return res.status(400).json({ output: 'No song file uploaded' });
    }

    const songFile = req.files.song[0];
    const coverFile = req.files.cover ? req.files.cover[0] : null;

    const songResult = await uploadToCloudinary(songFile.buffer, 'songs');

    let coverResult = songResult; 
    if (coverFile) {
      coverResult = await uploadToCloudinary(coverFile.buffer, 'covers');
    }

    const newSong = new SongModule({
      songUrl: songResult.secure_url,
      coverUrl: coverResult.secure_url,
      Songname,
      Artist,
      Genere,
      Language,
      Songtype,
    });

    await newSong.save();

    res.status(200).json({output: 'Song uploaded successfully',status:"Success",});
  } catch (error) {
    console.error(error);
    res.status(500).json({ output: 'Error uploading song', error });
  }
};

const GetSongs = async (req, res) => {
  try {
    const AllSongs = await SongModule.find({}).lean();
    res.status(200).json({ output: AllSongs, status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ output: "Error occurred" });
  }
};

const GetSongUrl = async (req, res) => {
  try{
  const {id}=req.params;
  const Songdb= await SongModule.findById(id);
  if(!Songdb){
    res.status(500).json({output:"Song is not available"})
  }
  else{
    res.status(202).json({output:Songdb,status:"Success"})
  }
}catch(error){
  res.status(500).json({ output: "Error occurred" });
}
};

const GetArtistSong=async(req,res)=>{
try{  
  let {ArtistName}=req.params;
  const ArtistSongs = await SongModule.find({
    Artist: { $regex: new RegExp("^" + ArtistName + "$", "i") },
  });
  if(!ArtistSongs || ArtistSongs.length===0){
    res.status(200).json({output:"No Songs are available"})
  }
  else{
    res.status(200).json({output:ArtistSongs,status:"Success"})
  }
}catch(error){
  console.log(error);
}}

const GetSongNames = async (req, res) => {
  try {
    const songs = await SongModule.find({}).lean();
    const songNames = songs.map(song => song.Songname);
    res.json({ output: songNames, status: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ output: "Error fetching song names", error });
  }
};

module.exports = { upload, uploadSong, GetSongs ,GetSongUrl,GetArtistSong,GetSongNames};