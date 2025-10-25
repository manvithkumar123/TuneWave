import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getAllSongs = async () => {
  const response = await axios.get(`${API_URL}/song/Get-songs`);
  try {
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetArtistSong = async (artistName) => {
  const response = await axios.get(`${API_URL}/song/Artist/${artistName}`);
  try {
    return response.data;
  } catch (error) {
    return error.response?.data || { output: "Error fetching artist songs" };
  }
};

export const GetSongNames=async ()=>{
  const response = await axios.get(`${API_URL}/song/Song-names`)
  try{
    return response.data
  }
  catch(error){
    return error.response;
  }
}
