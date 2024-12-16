import ApiError from "../utilities/ApiError.js";
import asyncHandler from "../utilities/asyncHandler.js"; 
import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js"; 
import { refreshAccessToken } from "../controllers/user.controller.js";
const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log("Inside jwt");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            throw new ApiError(400, "Error while decoding the token");
        }
        const userInDatabase = await User.findById(decodedToken?._id);
        if (!userInDatabase) {
            throw new ApiError(401, "Invalid AccessToken");
        }
        req.user = userInDatabase;
        next(); // Proceed if authentication is successful
    } catch (error) {
        next(new ApiError(error.status, error.message));
    }
};

export default verifyJWT;