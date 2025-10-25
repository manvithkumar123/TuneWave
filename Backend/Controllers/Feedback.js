const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FeedBackModel = require("../Database/FeedbackModule.js");
const { GenerateToken } = require("../utils/GenerateToken.js");
const cookie = require("cookie-parser");
const UserModule = require("../Database/UserModule.js");

module.exports.UploadFeedback= async (req,res)=>{
    let {FeedBack}=req.body;
    const loggeduser=req.user;
    try{
        const Email=loggeduser.Email;
        const User=await FeedBackModel.findOne({Email:loggeduser.Email})
        if(User){
            res.status(409).json({output:"Feedback has been already submitted"})
        }
        else{
            const NewFeedback = new FeedBackModel({
              FeedBack,
              Username: loggeduser.Username,
              Email: loggeduser.Email
            });
            await NewFeedback.save();
            res.status(201).json({output:"successfully submitted feedback",status:"Success"});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({output:"an error occured"})
    }
}

module.exports.GetAllFeedbacks = async (req, res) => {
    try {
      const feedbacks = await FeedBackModel.find();
      const response = { output: feedbacks, status: "Success" };
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ output: "An error occurred" });
    }
  };