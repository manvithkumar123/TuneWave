import {React,useEffect, useState } from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import { LoggedUser,LogoutUser } from '../../../Api/LoginApi';
import { UploadSong } from '../../../Api/UploadApi';
const Navbar = () => {
  const[userLoggedIn,SetUserLoggedIn]=useState(false);
  const[Uploadsection,SetUploadSection]=useState(false);
  const GenereList=["POP","HAPPY","SAD","Romance","Rock","Devotional","other"]
  const LanguageList=["Telugu","Hindi","Tamil","Kanada","Malayalam","English","other"]
  const [songFile, setSongFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [genere, setGenere] = useState("");
  const [language, setLanguage] = useState("");
  const [uploadOutput,setUploadOutput]=useState("")
  const handleLogout=async()=>{
    try{
    const response=await LogoutUser();
    if(response.status==="Success"){
      toast.success(response.output)
    }
    else{
      toast.error(response.output)
    }
  }catch(error){
    console.log(error)  
  }
}
  useEffect(() => {
    const checkLogin = async () => {
      const response = await LoggedUser();
      try{
        if(response.loggedIn==="true"){
          SetUserLoggedIn(true);
        }
        else{
          SetUserLoggedIn(false);
        }
      }catch(error){
        console.log(error)
      }
    };
    checkLogin();
  }, []);
  const navigate=useNavigate();
  useEffect(() => {
    if (Uploadsection) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [Uploadsection]);
  const handleUpload=async(e)=>{
    e.preventDefault();
    try{
    const response = await UploadSong(songFile,coverFile,songName,artist,genere,language);
    if(response.status==="Success"){
      toast.success(response.output)
      setUploadOutput(null)
    }
    else{
      toast.error(response.output)
    }
    }catch(error){
      toast.error("an error occured");
      console.log(error)
    }
  }
  return (
<>
    <nav> 
    {Uploadsection ? 
    <div className="upload-section">
      <div className="upload-form-section">
        <form>
        <div className="upload-container-flex">
        <div className="file-upload-form">
          <label htmlFor="file" className="file-upload-label">
            <div className="file-upload-design">
              <svg viewBox="0 0 640 512" height="1em">
                <path
                  d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                ></path>
              </svg>
              <p>Drag and Drop</p>
              <p>(Song File)</p>
              <p>or</p>
              <span className="browse-button">Browse file</span>
            </div>
            <input id="file" type="file" onChange={(e)=>setSongFile(e.target.files[0])} />
          </label>
        </div>
        </div>
        <div className="upload-components-coloum">
        <label id="label-flex">
        <h3>CoverFile</h3>
        <input type="file" onChange={(e)=>setCoverFile(e.target.files[0])} />
        </label>
        <label id="label-flex">
        <h3>SongName</h3>
        <input type="text" onChange={(e)=>setSongName(e.target.value)}/>
        </label>
        <label id="label-flex">
        <h3>Artist</h3>
        <input type="text" onChange={(e)=>setArtist(e.target.value)} />
        </label>
        <label id="label-flex">
          <h3>Genere</h3>
          <select name="Genere" value={genere}  onChange={(e)=>setGenere(e.target.value)}>
          <option value="" disabled hidden>Select Genre</option>
          {GenereList.map((item,index)=>(
          <option value={item} key={index}>{item}</option>
          ))}
          </select>
        </label>
        <label id="label-flex">
          <h3>Language</h3>
          <select name="Language" value={language} onChange={(e)=>setLanguage(e.target.value)}>
          <option value="" disabled hidden>Select Language</option>
          {LanguageList.map((item,index)=>(
          <option value={item} key={index}>{item}</option>
          ))}
          </select>
        </label>
        <div className="upload-button-container">
          <button id="Upload-btn"   type="button" style={{ display: !uploadOutput ? "block" : "none" }} onClick={(e)=>{handleUpload(e);setUploadOutput("Song will be uploaded in few minutes you can exit")}} >Upload</button>
          <p>{uploadOutput}</p>
        </div>
        </div>
        </form>
      <button id="close-btn" onClick={()=>{SetUploadSection(false)}}><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>:null
    }
    <img id="tunewave-logo" src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1760542976/logo_givshm.png" alt="" />
    <h3 id="logo-tunewave">TuneWave</h3>
    <div className="menu_upload-container">
    {userLoggedIn ? <button id="Menu-button" onClick={()=>{handleLogout()}}>Logout</button>
    :<button id="Menu-button" onClick={()=>{navigate("/login-page")}}>Login</button>
    }
    {userLoggedIn ? 
    <Button id="Upload-button" style={{backgroundColor:"white"}} onClick={()=>(SetUploadSection(!Uploadsection))}>Upload</Button>
    :
    <Button id="Upload-button" disabled style={{backgroundColor:"white"}} >Upload</Button>
    }
    </div>
    
  </nav>
  </>
  )
}

export default Navbar
