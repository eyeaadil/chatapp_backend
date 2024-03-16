import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/userModel.js";
dotenv.config();
const protectRoute = async(req,res,next)=>{
    
    try {
        const token=req.cookies.jwt;
        // console.log(token);
        if(!token) return res.json({error:true,msg:"No Token Provided"});
        const decoded  = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)

        if(!decoded){
            return res.json({error:"unauthorised - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("password");

        // console.log(user)
        // console.log(decoded.userId)
        // console.log(userId);
        if(!user){
            return res.json({error: "  User not found"})
        }

        req.user=user
        next()
    } catch (error) {
        console.log("Error in the middleware", error.message);
        res.json({error:"Internal server error"});
    }
}

export default protectRoute