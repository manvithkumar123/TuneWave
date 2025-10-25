import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const LoginUserApi = async (Email, Password) => {
    const response = await axios.post(
      `${API_URL}/user/login`,
      { Email, Password },
      { withCredentials: true }
    );
  try {
    return response.data;
  } catch (error) {
    return response.data.error
  }
};

export const LogoutUser = async () => {
    const response = await axios.post(`${API_URL}/user/logout`,{},{ withCredentials: true });
  try {
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const RegisterUser = async (Email, Username, Password) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/register`,
      { Email, Username, Password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const LoggedUser=async ()=>{
  const response = await axios.get(`${API_URL}/user/Get-user`,{withCredentials:true});
  try{
    return response.data
  }
  catch(error){
    return error.response?.data
  }
}