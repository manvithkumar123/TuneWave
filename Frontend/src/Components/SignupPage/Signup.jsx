import {React,useState} from 'react'
import "./signup.css"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { RegisterUser } from '../../../Api/LoginApi'
const Signup = () => {
  const navigate=useNavigate();
  const HandleRegister=async (e)=>{
    e.preventDefault();
    try{
    const response = await RegisterUser(registerEmail,registerUsername,registerPassword);
    if(response.status==="Success"){
    toast.success(response.output)
    navigate("/");
    }else{
      toast.error(response.output)
    }
    }catch(error){
      toast.error("An error occured");
      console.log(error)
    }
  }
  const[registerUsername,SetRegisterUsername]=useState("")
  const[registerEmail,SetRegisterEmail]=useState("")
  const[registerPassword,SetRegisterPassword]=useState("")
  return (
      <div className="signup-page">
<div className="container">
  <div className="heading">Sign Up</div>
  <form action="" className="form" onSubmit={HandleRegister}>
    <input
      required
      className="input"
      type="email"
      name="email"
      id="email"
      placeholder="E-mail"
      value={registerEmail}
      onChange={(e)=>SetRegisterEmail(e.target.value)}
    />
    <input
      required
      className="input"
      type="text"
      name="Username"
      id="Username"
      placeholder="Username"
      value={registerUsername}
      onChange={(e)=>{SetRegisterUsername(e.target.value)}}
    />
    <input
      required
      className="input"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      value={registerPassword}
      onChange={(e)=>{SetRegisterPassword(e.target.value)}}
    />
    <span className="forgot-password">
      <a href="#">Forgot Password ?</a>
    </span>
    <input className="login-button" type="submit" value="Sign In" />
  </form>

    <h5 className="title">Already have an account<span style={{marginLeft:"3px",color:"#1289d3",opacity:"100%",cursor:"pointer"}} onClick={()=>{navigate("/login-page")}}>Sign in?</span></h5>

  <span className="agreement">
    <a href="#">Learn user licence agreement</a>
  </span>
</div>
    </div>
  )
}

export default Signup
