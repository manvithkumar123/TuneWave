
import React from 'react'
import Homepage from './Components/Homepage/Homepage'
import {Route, Routes} from "react-router-dom"
import Navbar from './Components/Navbar/Navbar'
import Explore from './Components/ExplorePage/Explore'
import MusicCard from './Components/Musiccard/MusicCard'
import LoginPage from './Components/LoginPage/LoginPage'
import { useLocation } from 'react-router-dom'
import Signup from './Components/SignupPage/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArtistPage from './Components/Artist/ArtistPage'
import LikePage from './Components/LikedSongs/LikePage'
import { CurrentSongProvider } from '../Context/SongContext'
const App = () => {
  const location = useLocation();
  const hideMusicNavbar = location.pathname === "/login-page" || location.pathname === "/signup-page";
  return (
    <>
    <CurrentSongProvider>
      {!hideMusicNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/login-page" element={<LoginPage/>}/>
        <Route path="/signup-page" element={<Signup/>}/>
        <Route path="explore/artist/:name" element={<ArtistPage/>}/>
        <Route path="explore/liked-songs" element={<LikePage/>}/>
      </Routes>
      {!hideMusicNavbar && <MusicCard />}
      <ToastContainer
        position="top-right"
        limit={1}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </CurrentSongProvider>
    </>
  )
}

export default App
