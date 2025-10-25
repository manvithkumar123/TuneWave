import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

export const FetchFeedBack=async ()=>{
    const response = await axios.get(`${API_URL}/user/All-Feedback`)
    try{
        return response.data;
    }catch(error){
        return response.data.error
    }
};
export const SendFeedBack=async(FeedBack)=>{
    const response =await axios.post(`${API_URL}/user/Feedback`,{FeedBack},{withCredentials:true})
    try{
        return response.data;
    }catch(error){
     return error?.response?.data;
    }
}
