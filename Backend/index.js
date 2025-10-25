const express=require("express");
const app=express();
const cors = require("cors");
const path=require("path");
require ("dotenv").config();
const mongoose=require("./Database/Mongooseconnect.js")
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const UserRoute=require("./Routes/UserRoute.js");
const SongRoute=require("./Routes/SongRoute.js")
const likedRoute=require("./Routes/LikedList.js")


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,               
}));

app.use("/api/user",UserRoute);
app.use("/api/song",SongRoute);
app.use("/api/liked",likedRoute);

app.get("/",(req,res)=>{
    res.send("running sucessfully")
})


app.listen("3000")