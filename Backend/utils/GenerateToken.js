const jwt=require("jsonwebtoken");
const user=require("../Database/UserModule.js")

module.exports.GenerateToken = (user)=>{
    return jwt.sign({Email:user.Email,id:user._id,role:user.role},process.env.JWT_TOKEN)
}