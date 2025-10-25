import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const UploadSong = async (songFile, coverFile, songName, artist, genere, language, songType) => {
    const formData = new FormData();
    formData.append("Songname", songName);
    formData.append("Artist", artist);
    formData.append("Genere", genere);
    formData.append("Language", language);
    formData.append("Songtype", "General");
    formData.append("song", songFile);
    formData.append("cover", coverFile);

    const response = await axios.post(`${API_URL}/song/upload-song`,formData,{withCredentials: true});
    try{
        return response.data;
    }
    catch(error){
        return error?.response?.data;
    }
}