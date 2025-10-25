import { React,useEffect,useState } from 'react'
import "./likepage.css"
import { GetSongs } from '../../../Api/LikeSongApi';
import { ToastContainer, toast } from 'react-toastify';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { DeleteSong } from '../../../Api/LikeSongApi';

const LikePage = () => {
    const [songloading,SetsongLoading]=useState(true);
    const [songloadingimg,SetsongLoadingimg]=useState(true);
    const [songdata, SetSongdata] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{
            const FetchSongs=async()=>{
            try{
            const response = await GetSongs();
            if(response.status==="Success"){
                SetSongdata(response.songs)
                SetsongLoading(false)
            }
            else{
                toast.error(response.output)
                console.log(response)
            }
            }catch(error){
                console.log(error)
            }
        }
        FetchSongs();
    },[])
    const HandleDelete=async(songId)=>{
        try{        
        const response=await DeleteSong(songId)
        if(response.status==="Success"){
            toast.success(response.output)
        }
        else{
            toast.error(response.output)
        }}
        catch{
            console.log(error);
        }
    }
  return (
    <>
    <div className="navigation-container">
    <h4 onClick={() => navigate("/")}>Home&gt;</h4>
    <h4 onClick={() => navigate("/explore")}>Explore&gt;</h4>
    <h4 onClick={() => navigate("/explore")}>Liked Songs</h4>
    </div>
    <div className="like-songs-page">
        <h1>Liked Songs</h1>
        <h4>Total Songs:</h4>
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
        {songdata.map((item,index)=>(
                    <div className="music-card" key={item._id}>
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
                    <div className="delete-button"  >
                    <button aria-label="Delete item" className="delete-button" id={`delete-${item._id}` } onClick={() => {HandleDelete(item._id)}}>
                        <svg className="trash-svg" viewBox="0 -10 64 74" xmlns="http://www.w3.org/2000/svg">
                    <g id="trash-can">
                          <rect x="16"y="24"width="32"height="30"rx="3"ry="3"fill="#e74c3c"/>
                        <g id="lid-group" style={{ transformOrigin: "12 18" }}>
                              <rect  x="12" y="12"width="40"height="6"rx="2"ry="2"fill="#c0392b"/>
                            <rect x="26"y="8"width="12"height="4"rx="2"ry="2"fill="#c0392b"/>
                            </g>
                            </g>
                            </svg>
                      </button>
                      </div>
                      </div>
                    ))}
        </div>
    </div>
    </>
  )
}

export default LikePage
