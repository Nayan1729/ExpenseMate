import ApiError from "../utilities/ApiError.js"
import  ApiResponse from "../utilities/ApiResponse.js"
import asyncHandler from "../utilities/asyncHandler.js"
import { User } from "../models/users.models.js"
import sendEmail from "../utilities/emailService.js"
import jwt from "jsonwebtoken"
const options =  { // Options have to be added to send cookies
    httpOnly: true,
    secure: true // By turning secure on the cookies will only be modifiable at the server and not at the front end Thus making it secure
  }
  const generateAccessAndRefreshToken = async (userId)=>{
    try {
        const userInDatabase = await User.findById(userId);
        
        if(!userInDatabase){
            throw new ApiError(400,"No user for the given userId");
        }
        
        
        const accessToken = userInDatabase.generateAccessToken();
        
        
        const refreshToken = userInDatabase.generateRefreshToken();
        
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

  const registerUser = asyncHandler(async (req, res) => {
    const { username, email, mobileNo, password } = req.body;
    console.log("Registeer User"+email);
    
    if ([email, password, username, mobileNo].some((field) => field?.trim() === "")) {
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

    // Register user
    const registeredUser = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        provider: 'local',
        mobileNo
    });

    // Check for user creation
    const createdUser = await User.findById(registeredUser._id).select("-password -refreshToken");
    if (!createdUser) throw new ApiError(500, "Something went wrong while creating user");

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(createdUser._id);

    // Set cookies with tokens
    res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, createdUser, "User Registered and Logged in Successfully"));
});


const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    
    
    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    const userInDatabase = await User.findOne({email}).select("+password");
    console.log(userInDatabase);
    
    if(!userInDatabase){
        throw new ApiError(400,"No user with this email found");
    } 
    
    
    const isPasswordValid = await userInDatabase.isPasswordCorrect(password);
    if(!isPasswordValid) {
        throw new ApiError(400,"Invalid login credentials");
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(userInDatabase?._id);
    // The user we have is the old user who doesnt have the refreshToken so find again
    console.log("Access Token1:   "+accessToken);
    
    const loggedInUser = await User.findById(userInDatabase._id);
    return res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json(new ApiResponse(200,loggedInUser,"User loggedIn successfully"));
})
const getCurrentUser = asyncHandler ( async(req,res)=>{
    return res
              .status(200)
              .json(new ApiResponse(200,req.user,"Current user fetched successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    let incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    /*
    Cookie-based Authentication: Many web applications use cookies to store tokens for authentication purposes because cookies are 
      automatically sent with every request to the server, simplifying the authentication process.

  Request Body: In some cases, especially in APIs or mobile applications, the refresh token might be sent in the body of a POST request. 
    This approach can be more secure in certain contexts, such as when dealing with cross-origin requests where cookies might not be sent.
    
    */
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken, 
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
        
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
        // This token has been saved in the database in the usre as well and it is only left to propogate it to the user in the form of cookie
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        return res.status(401).json(new ApiError(401, error.message || "Invalid refresh token"));
    }

  })

export {registerUser,loginUser,getCurrentUser,refreshAccessToken}
    

