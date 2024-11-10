import ApiError from "../utilities/ApiError.js";
import ApiRespose from "../utilities/ApiResponse.js";
import asyncHandler from "../utilities/asyncHandler.js";
import { Friend } from "../models/friends.models.js";

const createFriendship = asyncHandler(async (req, res) => {
    try {
        console.log("Inside createFriendship endpoint");

        const { user1, user2 } = req.body;
        console.log("Received data:", { user1, user2 });

        // Ensure both user1 and user2 are present
        if (!user1 || !user2) {
            return res.status(400).json(new ApiError(400, "Both user1 and user2 are required"));
        }

        // Attempt to create friendship
       
        
        const friendshipCreated = await Friend.createFriendShip(user1, user2);
        

        if (friendshipCreated) {
            return res.status(201).json(new ApiRespose(201, friendshipCreated, "Friendship created successfully"));
        } else {
            return res.status(400).json(new ApiError(400, "Friendship already exists"));
        }
    } catch (error) {
        console.error("Error in createFriendship:", error);  // Log the full error for debugging
        return res.status(error.status || 500).json(
            new ApiError(error.status || 500, error.message || "Error creating friendship")
        );
    }
});



export {createFriendship}