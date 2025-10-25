
import { GetSongNames } from '../../Api/SongsApi';


export const getSongsList = async () => {
  try {
    const response = await GetSongNames();
    if (response.status === "Success") {
      return response.output; 
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching song names:", error);
    return [];
  }
};