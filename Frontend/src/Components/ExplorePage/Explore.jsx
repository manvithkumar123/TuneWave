import { React, useEffect, useState, useRef, useContext } from 'react'
import "./explore.css";
import { ToastContainer, toast } from 'react-toastify';
import { getAllSongs } from '../../../Api/SongsApi'
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { PopularArtist } from '../../DataModules/PopularArtist';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getSongsList } from '../../DataModules/SongsList';
import { LikeSong } from '../../../Api/LikeSongApi';
import { GetMusicLink } from '../../../Api/MusicLinkApi';
import { CurrentSongContext } from '../../../Context/SongContext';

const Explore = () => {
  const [songdata, SetSongdata] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [songsList, setSongsList] = useState([]);
  const toastFetched = useRef(false);
  const GenereList=["POP","HAPPY","SAD","Romance","Rock","Devotional","other"]
  const LanguageList=["Telugu","Hindi","Tamil","Kanada","Malayalam","English","other"]
  const [GenereFilter, SetGenereFilter] = useState("all");
  const [languageFilter,SetLanguageFilter]=useState("all")
  const [songloading,SetsongLoading]=useState(true);
  const [songloadingimg,SetsongLoadingimg]=useState(true);
  const [loadingtext,Setloadingtext]=useState("");
  const {setSongData}=useContext(CurrentSongContext);
  const [likedSongs, setLikedSongs] = useState([]);
  useEffect(() => {
    const fetchSongsList = async () => {
      const list = await getSongsList();
      setSongsList(prevList => {
        const newNames = list.filter(name => !prevList.includes(name));
        return [...prevList, ...newNames];
      });
    };
    fetchSongsList();
  }, []);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getAllSongs();
        if (songs.status === "success" && Array.isArray(songs.output)) {
          SetSongdata(songs.output);
          if (!toastFetched.current) {
            toastFetched.current = true;
            SetsongLoading(false);
            Setloadingtext("No songs available")
          }
        } else {
          SetSongdata([]);
          toast.error("Data Not Fetched");
          SetsongLoading(false);
          Setloadingtext("No songs available")
        }
      } catch (error) {
        SetSongdata([]);
        console.error(error);
      }
    };
    fetchSongs();
  }, []);
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
  return (
<>
  <div className="navigation-container">
    <h4 onClick={() => navigate("/")}>Home&gt;</h4>
    <h4>Explore</h4>
  </div>
  <div className="filters-homepage-page">
    <div className="filter-section">
  <div className="search-bar-section">
  <Autocomplete disablePortal options={songsList} className='search-bar'
   inputValue={searchText} onInputChange={(event, newInputValue) => {
     setSearchText(newInputValue);
   }}
  renderInput={(params) => <TextField id="standard-basic" {...params}  placeholder='search' />}
  />
  </div>
    <h3>Filters</h3>
    <div className="heading-filter">
    <div className="greenbox"></div>
    <h4>Genere</h4>
    </div>
    {GenereList.map((item, index) => (
  <div className="filter-option" key={index}>
    <label>
      <input
        type="checkbox"
        name="genre"
        value={item}
        checked={GenereFilter === item}
        onChange={() => SetGenereFilter(prev => (prev === item ? "all" : item))}
      />
      <p>{item}</p>
    </label>
  </div>
))}
<div className="heading-filter">
  <div className="greenbox"></div>
  <h4>Language</h4>
</div>
<>
{LanguageList.map((item, index) => (
  <div className="filter-option" key={index}>
    <label>
      <input
        type="checkbox"
        name="language" 
        value={item}
        checked={languageFilter === item}
        onChange={() => SetLanguageFilter(prev => (prev === item ? "all" : item))}
      />
      <p>{item}</p>
    </label>
  </div>
))}
<button id="Menu-button" style={{backgroundColor:"#ee5680",color:"white"}} onClick={()=>{navigate("liked-songs")}}>Liked Songs</button>
</>
    </div>
    <div className="explore-homepage">
      <div className="promotion-song-container">
        <img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1761324105/logo1_nwr8be.jpg" alt=""/>
        <div id="play-button">
          <i className="fa-solid fa-play" />
        </div>
      </div>
        <h2 id="popular-text">Popular Artist</h2>
      <div className="popular-artist-container">
        {PopularArtist.map((item,index)=>(
      <div className="popular-artist-card" onClick={()=>{navigate(`Artist/${item.name}`)}} key={index}>
          <div className="popular-artists">
            <img src={item.imageUrl} alt="" />
          </div>
      </div>
      ))}
      </div>
      <div className="songs_container">
        <h2>All Songs</h2>
        <div className="all-songs-list-flex">
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
            songdata
            .filter(item => 
              (GenereFilter === "all" || item.Genere === GenereFilter) &&
              (languageFilter === "all" || item.Language === languageFilter)&&
              (searchText === "" || item.Songname.toLowerCase().includes(searchText.toLowerCase()))
            )
            .map((item) => (
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
                  <input type="checkbox" className="checkbox" id={`heart-${item._id}`}onChange={() => {HandleLike(item._id);}}  />
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
            <p>{loadingtext}</p>
          )}
        </div>
      </div>
    </div>
  </div>
</>
  )
}

export default Explore
