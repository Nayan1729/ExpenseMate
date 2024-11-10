import ApiError from "../utilities/ApiError.js";
import asyncHandler from "../utilities/asyncHandler.js"; 
import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js"; 
import { refreshAccessToken } from "../controllers/user.controller.js";
const verifyJWT = async(req,res,next)=>{
    try {
        
        
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","");
        console.log("Inside jwt");
        console.log("Access token:"+token);
        
        if(!token) {
            
            throw new ApiError(401,"Unauthorized request");
        }
        
        const decodedToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        if(!decodedToken){
            throw new ApiError(400,"Error while decoding the token");
        }
        const userInDatabase = await User.findById(decodedToken?._id);
        if(!userInDatabase){
            console.log("Hello now userIndatabase in verifyjwt");
            
            throw new ApiError(401,"Invalid AccessToken")
        }
        req.user = userInDatabase;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            console.log("Token expired, attempting to refresh access token.");

            // Attempt to refresh access token if it expired
            const refreshResponse = await refreshAccessToken(req, res,next);
            console.log(refreshResponse);
            
            // if (refreshResponse.status === 200) {
            //     // Retry the request after refreshing the token
            //     return verifyJWT(req, res, next);
            // }
        }
        next(new ApiError(401, error.message));
    }
}
export default verifyJWT;