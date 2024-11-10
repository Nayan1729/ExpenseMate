import ApiError from "../utilities/ApiError.js";
import ApiRespose from "../utilities/ApiResponse.js";
import asyncHandler from "../utilities/asyncHandler.js";
import { Invitation } from "../models/invitations.models.js";
import sendEmail from "../utilities/emailService.js";

const inviteUsingEmail = asyncHandler(async(req,res)=>{
    const receiverEmail = req.body.email;
   try {
        if(!receiverEmail){
            throw new ApiError(400,"Email field is empty");
        }
        
        const invitation = new Invitation({
            senderId: req.user._id,
            receiverEmail
        })
        const token= invitation.generateToken();
        
        console.log("token:"+token);
        
        const appUrl = process.env.APP_URL;
        const completeAppUrl = `${appUrl}/invite?token=${token}`;
        const subject = 'Join ExpenseMate!';
        const text = `Hey! Join ${req.user.username}on ExpenseMate. Click the link to sign up: ${completeAppUrl}`;

        const result = await sendEmail(receiverEmail, subject, text);
        if(result.success){
            await invitation.save();
            return res.status(201).json(new ApiRespose(201,result.response,"Email sent successfully"));
        }
        else{
            throw new ApiError(500,result.response)
        }
   } catch (error) {
        throw new ApiError(500,error.message);
   }
})

    const verifyToken = asyncHandler(async(req,res)=>{
        try {
            const {token} =req.params;
            if(!token){
                throw new ApiError(400,"Invitation Token missing");
            }
            const invitation = await Invitation.findOne({token});
            const currentTime = new Date()
            if(invitation.expiresAt < currentTime){
                throw new ApiError(400,"Invitation Token expired");
            }
                return res.status(200).json(new ApiRespose(200,invitation,"Token verified successfully"));
        } catch (error) {
            throw new ApiError(400,error.message);
        }
    })

    const acceptInvitation = asyncHandler(async(req,res)=>{
        const {token} = req.body;
        if(!token){
            throw new ApiError(400,"Token requrired to accept invitation");
        }
        try {
            const acceptedInvitation = await Invitation.acceptRequest(token);
            return res.status(200).json(new ApiRespose(200,acceptedInvitation,"Invitaion accepted successfully"));
        } catch (error) {
            return new ApiError(error.status || 400, error.message || "Error while accepting token");
        }
    });

export {inviteUsingEmail,verifyToken,acceptInvitation}