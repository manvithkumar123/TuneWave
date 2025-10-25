const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModule = require("../Database/UserModule.js");
const { GenerateToken } = require("../utils/GenerateToken.js");
const cookie = require("cookie-parser");

module.exports.RegisterUser = async (req, res) => {
    try {
        const { Username, Password, Email, role } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

      const existingUser =  await UserModule.findOne({Email:Email});
            if(existingUser){
               return res.status(500).json({output:"Entered User already have an account",status:"failed"})
            }
            else{
              let user = await UserModule.create({
              Username: Username,
              Password: hashedPassword,
              Email: Email,
              role: role
              })
              
              const token = GenerateToken(user);
              res.cookie("usertoken", token, { httpOnly: true,secure: true, sameSite: 'None' });
              res.status(201).json({output:"Registered Sucessfully",status:"Success"});
    }
    } catch (err) {
        console.error(err);
        res.status(500).json({ output: "Registration failed",status:"failed" });
    }
};

module.exports.LoginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const LoggedUser = await UserModule.findOne({ Email: Email });

        if (!LoggedUser) {
            return res.status(401).json({ output: "User not found" ,status:"failed"});
        }

        const isMatch = await bcrypt.compare(Password, LoggedUser.Password);
        if (!isMatch) {
            return res.status(401).json({ output: "Invalid credentials",status:"failed" });
        }
        const token = GenerateToken(LoggedUser);
        res.cookie("usertoken", token, { httpOnly: true,secure: true, sameSite: 'None' });
        res.status(200).json({ output: "Login successful", role: LoggedUser.role,status:"success" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ output: "An error occurred while logging in",status:"failed" });
    }
};

module.exports.LogoutUser=async(req,res)=>{
    try{
    res.clearCookie("usertoken", { httpOnly: true, secure: true, sameSite: 'None' });
    res.status(200).json({output:"Logged out Sucessfully",status:"Success"});
    }catch(error){
        res.status(500).json({output:"error in logging out",status:"failed"})
    }
}

module.exports.GetUser=async(req,res)=>{
    const loggedUserid=req.user;
    const loggedUser=await UserModule.findOne({Email:loggedUserid.Email})
    if(!loggedUser){
        res.status(500).json({output:"please login First",loggedIn:"false"});
    }
    else{
        res.status(201).json({output:"User logged in",loggedIn:"true"});
    }
}