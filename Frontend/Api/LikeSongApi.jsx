import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

export const LikeSong = async (songId) => {
    try {
      if (!songId) throw new Error("songId is required");
      const response = await axios.post(`${API_URL}/liked/like/${songId}`,{},{withCredentials:true});
      return response.data;
    } catch (error) {
      return {
        output: "Failed to  song",
        error: error.response?.data?.error || error.message,
    };
    }
}

export const GetSongs= async()=>{
  try{
  const response = await axios.get(`${API_URL}/liked/getsongs`,{withCredentials:true})
    return response.data;
  }catch(error){
    return error;
  }
}
export const DeleteSong = async (songId) => {
  try {
    if (!songId) throw new Error("songId is required");
    const response = await axios.post(`${API_URL}/liked/Dislike/${songId}`,{},{withCredentials:true});
    return response.data;
  } catch (error) {
    return {
      output: "Failed to  song",
      error: error.response?.data?.error || error.message,
  };
  }
}