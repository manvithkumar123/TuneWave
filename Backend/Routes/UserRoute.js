const express=require("express");
const { RegisterUser, LoginUser, LogoutUser, GetUser }= require ("../Controllers/AuthController");
const isLoggedin = require("../MiddleWares/isLoggedin.js");
const { UploadFeedback, GetAllFeedbacks } = require("../Controllers/Feedback.js");
const router=express.Router();

router.post("/register",(RegisterUser));
router.post("/logout",isLoggedin,(LogoutUser)); 
router.post("/login",(LoginUser)); 
router.post("/Feedback",isLoggedin,(UploadFeedback)); 
router.get("/All-Feedback",(GetAllFeedbacks)); 
router.get("/Get-user",isLoggedin,(GetUser)); 

module.exports=router;