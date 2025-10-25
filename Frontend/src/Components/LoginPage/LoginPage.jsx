import  {React, useState } from 'react'
import "./loginpage.css"
import { useNavigate } from 'react-router-dom'
import { LoginUserApi ,LogoutUser} from '../../../Api/LoginApi';
import { ToastContainer, toast } from 'react-toastify';
const LoginPage = () => {
  const navigate=useNavigate();
  const[loginEmail,SetLoginEmail]=useState("")
  const[loginPassword,SetLoginPassword]=useState("")
  
  const HandleLogin=async (e)=>{
    e.preventDefault();
    try {
      const response = await LoginUserApi(loginEmail, loginPassword);
      console.log(response.output)
      toast.success(response.output);
      navigate("/");
    } catch (err) {
      // Axios throws for 401/404/500
      toast.error(err.response?.data?.output);
      console.log(err)
    }
  }
  const HandleLogout = async () => {
    try {
      const response = await LogoutUser();
      toast.success(response.output);
    } catch (err) {
      toast.error(err.response?.data?.output);
      console.log(err);
    }
  };
  return (
    <div className="login-page">
<div className="container">
  <div className="heading">Sign In</div>
  <form onSubmit={HandleLogin} className="form">
    <input
      required
      className="input"
      type="email"
      name="email"
      id="email"
      placeholder="E-mail"
      value={loginEmail}
      onChange={(e)=>{SetLoginEmail(e.target.value)}}
    />
    <input
      required
      className="input"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      value={loginPassword}
      onChange={(e)=>{SetLoginPassword(e.target.value)}}
    />
    <input className="login-button" type="submit" value="Sign In" />
  </form>

    <h5 className="title">Dont have an account<span style={{marginLeft:"3px",color:"#1289d3",opacity:"100%",cursor:"pointer"}} onClick={()=>{navigate("/signup-page")}}>Sign Up?</span></h5>

  <span className="agreement">
    <a href="#" onClick={HandleLogout}>Learn user licence agreement</a>
  </span>
</div>
    </div>
  )
}

export default LoginPage
