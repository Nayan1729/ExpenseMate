import ApiError from "../utilities/ApiError.js"
import  ApiResponse from "../utilities/ApiResponse.js"
import asyncHandler from "../utilities/asyncHandler.js"
import { User } from "../models/users.models.js"
import jwt from "jsonwebtoken"

const options =  { // Options have to be added to send cookies
    httpOnly: true,
    secure: true // By turning secure on the cookies will only be modifiable at the server and not at the front end Thus making it secure
  }
  const generateAccessAndRefreshToken = async (userId)=>{
    try {
        const userInDatabase = await User.findById(userId);
        console.log(userId);
        
        if(!userInDatabase){
            throw new ApiError(400,"No user for the given userId");
        }
        console.log(userInDatabase);
        
        const accessToken = userInDatabase.generateAccessToken();
        console.log(`Access Token:${accessToken}`);
        
        const refreshToken = userInDatabase.generateRefreshToken();
        console.log(`Refresh Token:${refreshToken}`);
        if(!accessToken || !refreshToken){
            throw new ApiError(400,"Error while generating access and tokens");
        }
        // Save the refreshToken in the user's db
        userInDatabase.refreshToken = refreshToken;
        await userInDatabase.save();
        return {accessToken,refreshToken};
    } catch (error) {
        throw new ApiError(400,"Error while generating access and tokens")
    }
  }



const registerUser = asyncHandler (async (req,res)=>{
     
    const { username, email,mobileNo, password } = req.body;

    
    if ([email, password,username,mobileNo].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    
    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new ApiError(400, "Email is already in use");
    }
    
    // Check if username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        throw new ApiError(400, "Username is already in use");
    }
    const mobileNoExists = await User.findOne({ mobileNo });
    if (mobileNoExists) {
        throw new ApiError(400, "Mobile No is already in use");
    }
    const registeredUser = await User.create({
        username : username.toLowerCase(),
        email,
        password,
        provider : 'local',
        mobileNo
    })
    const createdUser = await User.findById(registeredUser._id).select(" -password -refreshToken") ;  // This select method with the help of - will remove password and refreshToken 
    //Check for user Creation

    if(!createdUser) throw new ApiError(500,"Something went wrong while creating user")
    return res.status(201).json(new ApiResponse(200, createdUser,"User Registered Successfully"))
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    
    
    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    const userInDatabase = await User.findOne({email}).select("+password");;
    console.log(userInDatabase);
    
    if(!userInDatabase){
        throw new ApiError(400,"No user with this email found");
    } 
    console.log("Hlo");
    console.log(userInDatabase.email);
    
    const isPasswordValid = await userInDatabase.isPasswordCorrect(password);
    if(!isPasswordValid) {
        throw new ApiError(400,"Invalid login credentials");
    }
    const {accessToken,refreshToken} = generateAccessAndRefreshToken(userInDatabase?._id);
    // The user we have is the old user who doesnt have the refreshToken so find again
    const loggedInUser = await User.findById(userInDatabase._id);
    return res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json(new ApiResponse(200,loggedInUser,"User loggedIn successfully"));
})
export {registerUser,loginUser}


