import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const GetMusicLink=async(Music_id)=>{
    try{
    const response= await axios.get(`${API_URL}/song/${Music_id}`)
    return response.data;
    }catch(error){
        return error;
    }
}