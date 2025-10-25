import { React, useEffect, useState, useRef, useContext } from 'react'
import "./artist.css"
import {useParams} from "react-router-dom"
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllSongs, GetArtistSong } from '../../../Api/SongsApi';
import { PopularArtist } from '../../DataModules/PopularArtist';
import { LikeSong } from '../../../Api/LikeSongApi';
import { CurrentSongContext } from '../../../Context/SongContext';
import { GetMusicLink } from '../../../Api/MusicLinkApi';

const ArtistPage = () => {
    const {setSongData}=useContext(CurrentSongContext);
    const {name} = useParams();
    const [songloading,SetsongLoading]=useState(false);
    const [songloadingimg,SetsongLoadingimg]=useState(false);
    const [songdata, SetSongdata] = useState([]);
    const navigate=useNavigate();
    const [likedSongs, setLikedSongs] = useState([]);
    const artist=PopularArtist.find(
      (artist)=>artist.name===name
    );
    useEffect(()=>{
      const FetchArtistSong=async(e)=>{
        try{
          const songs=await GetArtistSong(name);
          if(songs.status==="Success"){
            SetSongdata(songs.output);
          }
          else{
            SetSongdata([]);
            toast.error(songs.output)
          }
        }catch(error){
          SetSongdata([]);
          console.log(error)
          toast.error("unable to fetch songs")
        }
      }
      FetchArtistSong();
    },[])
    const HandleLike = async (songId) => {
      if (!songId) return toast.error("Song ID missing");
    
      setLikedSongs(prev =>
        prev.includes(songId) ? prev.filter(s => s !== songId) : [...prev, songId]
      );
    
      try {
        const response = await LikeSong(songId);
        if (response.status !== "Success") {
          toast.error(response.output || "Failed to like song");
          setLikedSongs(prev =>
            prev.includes(songId) ? prev.filter(s => s !== songId) : [...prev, songId]
          );
        } else {
          toast.success(response.output);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error liking song");
        setLikedSongs(prev =>
          prev.includes(songId) ? prev.filter(s => s !== songId) : [...prev, songId]
        );
      }
    };
    const HandleCardClick=async(Music_id)=>{
        try{
          const response = await GetMusicLink(Music_id);
          if(response.status==="Success"){
            setSongData(response.output);
          }
          else{
            toast.error(response.output)
          }
        }catch(error){
          console.log(error);
        }
      };
      
  return (
    <>
    <div className="artist-page">
        <div className="navigation-container">
        <h4 onClick={() => navigate("/")}>Home&gt;</h4>
        <h4 onClick={() => navigate("/explore")}>Explore&gt;</h4>
        <h4>{name}</h4>
        </div>
      <div className="artist-img-container">
        <div className="img-artist-bg">
          <img src={artist.imageUrl} alt="" />
        </div>
        <div className="Artist-info-container">
          <h1>{name}</h1>
          <h4>Uploaded Songs:{songdata.length}</h4>
        </div>
      </div>
      <div className="artist-allsong-flex">
      <div className="songs_container" style={{width:"90%",}}>
        <div className="all-songs-list-flex" >
        {songloading ? 
              <>
              <div className="music-card"style={{backgroundColor:"rgba(51, 50, 50, 0.8)"}} >
              <div id="music-suggestion">
                {songloadingimg?
              <Skeleton variant="rectangular" id="music-card-loader" />
              :null}
              <div className="music-suggest-name">
                    <h3><Skeleton variant="rectangular" id="loader-text-card" /></h3>
                    <p><Skeleton variant="rectangular" id="loader-text-card2"/></p>
              </div>
              </div>
                </div>
                </> :null}
          {songdata && songdata.length > 0 ? (
            songdata.map((item) => (
              <div className="music-card" key={item._id} onClick={()=>{HandleCardClick(item._id)}}>
                <div id="music-suggestion">
                {songloadingimg && <Skeleton variant="rectangular" id="music-card-loader" />}
                <img
                src={item.coverUrl || "https://res.cloudinary.com/dvd8yytqv/image/upload/v1760542978/logo1_dfxluh.jpg"}
                alt={item.Songname}
                style={{ display: songloadingimg ? "none" : "block" }}
                onLoad={() => SetsongLoadingimg(false)}/>
                  <div id="play-button">
                    <i className="fa-solid fa-play" />
                  </div>
                  <div className="music-suggest-name">
                    <h3>{item.Songname}</h3>
                    <p>Song by {item.Artist}</p>
                  </div>
                </div>
                <div className="favourite-button">
                  <div className="heart-container" title="Like">
                  <input type="checkbox" className="checkbox" id={`heart-${item._id}`}onChange={() => {HandleLike(item._id);console.log(item._id)}}  />
                    <div className="svg-container">
                      <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                      </svg>
                      <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                      </svg>
                      <svg className="svg-celebrate" width={100} height={100} xmlns="http://www.w3.org/2000/svg">
                        <polygon points="10,10 20,20" />
                        <polygon points="10,50 20,50" />
                        <polygon points="20,80 30,70" />
                        <polygon points="90,10 80,20" />
                        <polygon points="90,50 80,50" />
                        <polygon points="80,80 70,70" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default ArtistPage
