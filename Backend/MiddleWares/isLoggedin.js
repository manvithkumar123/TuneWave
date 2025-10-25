const jwt = require("jsonwebtoken");
const UserModule = require("../Database/UserModule");

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.usertoken;
    if (!token) {
      return res.status(201).json({ output: "Please login first" });
    }

    const decode = jwt.verify(token, process.env.JWT_TOKEN);

    const loggedUser = await UserModule.findOne({ Email: decode.Email }).select("-Password");

    if (!loggedUser) {
      return res.status(201).json({ output: "Invalid token, please login again" });
    }

    req.user = loggedUser;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(201).json({ output: "Authentication failed, please login again" });
  }
};