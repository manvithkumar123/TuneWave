import {React, useEffect, useState,useRef,useContext } from 'react'
import "./Homepage.css"
import { useNavigate } from 'react-router-dom';
import {FetchFeedBack,SendFeedBack} from "../../../Api/FeedBackApi"
import { getAllSongs } from '../../../Api/SongsApi'
import Skeleton from '@mui/material/Skeleton';
import { ToastContainer, toast } from 'react-toastify';
import { CurrentSongContext } from '../../../Context/SongContext';
import { GetMusicLink } from '../../../Api/MusicLinkApi';

const Homepage = () => {
  const navigate=useNavigate();
  const[feedbackdata,SetFeedbackdata]=useState([])
  const[fbloading,SetFBloading]=useState(true)
  const[Songloading,SetSongLoading]=useState(true)
  const[promoteSong,setPromoteSong]=useState([])
  const toastFetched = useRef(false);
  const {setSongData}=useContext(CurrentSongContext);
  const[userFeedback,SetUserFeedback]=useState("");
useEffect(()=>{
  const getFeedback=async()=>{
    try {
      const feedbacks=await FetchFeedBack();
      if(feedbacks.status==="Success"){
        SetFeedbackdata(feedbacks.output)
        SetFBloading(false);
      }
      else{
        toast.error(feedbacks.output);
        SetFBloading(false);
      }
    }
    catch(error){
      console.log(error)
    }
  }
  getFeedback();
},[])
useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getAllSongs();
        if (songs.status === "success" && Array.isArray(songs.output)) {
          setPromoteSong(songs.output);
          if (!toastFetched.current) {
            toastFetched.current = true;
          }
        } else {
          setPromoteSong([]);
          toast.error("Data Not Fetched Successfully");
        }
      } catch (error) {
        setPromoteSong([]);
        console.error(error);
      }
    };

    fetchSongs();
}, []);
const HandleFeedback=async(e)=>{
  e.preventDefault();
  try{
  const response=await SendFeedBack(userFeedback);
  if(response.status==="Success"){
    toast.success(response.output);
  }
  else{
    toast.error(response.output)
  }
}catch(err){
  const message = err?.response?.data?.output;
  console.log(err)
}
}
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
  <div className="section-1">
    <h1 id="tag-heading-main">Where Music Meets You</h1>
    <div className="para-section">
      <h3 id="tag-sideheading-main">
        TuneWave invites you to explore the perfect harmony of music and
        innovation. Our vibrant platform is designed for audio enthusiasts
        seeking to discover and enjoy a curated world of sound.
      </h3>
    </div>
    <button id="listen-now-button" onClick={()=>{navigate("/explore")}}>Listen Now</button>
  </div>
  <div className="stylus-slinding">
    <div className="sliding-text">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="18px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#ffffff"
      >
        <path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" />
      </svg>
      <h3 id="listen-now">Listen Now</h3>
    </div>
  </div>
  <div className="logo-bg-img">
    <img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1761324105/logo1_nwr8be.jpg"  alt="" />
  </div>
  <div className="section-2">
    <h1 id="tag-heading-2">Music Releases</h1>
    <div className="music-suggestion-section-flex">
    {promoteSong && promoteSong.length > 0 ? (
            promoteSong.filter(item=> item.Songtype==="Promote")
            .slice(-5)
            .map((item) => (
              <div className="music-card" key={item._id} onClick={()=>{HandleCardClick(item._id)}}>
                <div id="music-suggestion">
                  <img src={item.coverUrl || "https://res.cloudinary.com/dvd8yytqv/image/upload/v1760542978/logo1_dfxluh.jpg"} alt={item.Songname} />
                  <div id="play-button">
                    <i className="fa-solid fa-play" />
                  </div>
                  <div className="music-suggest-name">
                    <h3>{item.Songname}</h3>
                    <p>Song by {item.Artist}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No songs available</p>
          )}
</div>
    <button id="Explore-button" onClick={()=>{navigate("/explore")}}>
      Explore Now
    </button>

  </div>
  <div className="section-3">
    <h1 id="tag-heading-2">Latest Videos</h1>
    <div id="viral-video-bg">
      <video src="" autoPlay="" muted="" playsInline="" />
    </div>
  </div>
  <div className="section-4">
    <h1 id="tag-heading-2">User Feedbacks</h1>
    <div className="feedback-section-flex">
  {feedbackdata?.length > 0 ? (
    fbloading ? 
     <div className="feedback-card">
        <h3><Skeleton animation="wave" height={10} width="80%" id="skeleton-loading" /></h3>
        <div className="img-profile-text">
          <div className="profile-description">
            <h3>    <Skeleton animation="wave" height={10} width="390px"  id="skeleton-loading" /></h3>
            <p id="job-description"><Skeleton animation="wave" height={10} width="80%" id="skeleton-loading" /></p>
          </div>
        </div>
      </div>:
    feedbackdata.slice(-3).map((item, index) => (
      <div className="feedback-card" key={index}>
        <h3>{item.FeedBack}</h3>
        <div className="img-profile-text">
          <div className="profile-description">
            <h3>{item.Username}</h3>
            <p id="job-description">Music Lover</p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p style={{ color: "white" }}>No feedback available yet.</p>
  )}
</div>
  </div>
  <footer>
    <div className="website-heading">
      <h2 id="heading-footer">TuneWave</h2>
    </div>
    <div className="flex-footer-container">
      <div className="footer-sec-1">
        <form  onSubmit={HandleFeedback}>
          <h1>Connecting Through Music</h1>
          <h3 style={{ marginTop: 15 }}>Feedback*</h3>
          <input type="text" required="" onChange={(e)=>SetUserFeedback(e.target.value)} value={userFeedback}/>
          <label htmlFor="" />
          <button style={{ marginTop: 10 }}>Submit</button>
        </form>
      </div>
      <div className="footer-sec-2">
        <div className="text-container-f2">
          <h3>+91 123-456-7890</h3>
          <h3>info@mysite.com</h3>
          <h3>
            500 Terry Francine Street,
            <br /> 6th Floor,San Francisco, <br /> CA 94158
          </h3>
          <div className="connect-us" />
        </div>
      </div>
      <div className="footer-sec-3">
        <div className="text-container-f2">
          <h3>Privacy Policy</h3>
          <h3>Accessibility Statement</h3>
          <h3>Terms &amp; Conditions</h3>
        </div>
      </div>
    </div>
    <h4 id="tag-footer">© 2035 by TuneWave</h4>
  </footer>
</>
)}
export default Homepage