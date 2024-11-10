import mongoose from "mongoose";
const friendSchema = new mongoose.Schema({
    user1: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    user2: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, { timestamps: true });

friendSchema.statics.createFriendShip = async function(user1,user2){
    console.log("inside create Friend of FriendsModel");
    
   try {
     const isExistingFriendship = await this.findOne({
         $or:[
             {user1,user2},
             {user1:user2 , user2:user1}
         ]
     });
     console.log("isExistingFriendship"+isExistingFriendship);
     
     if(!isExistingFriendship){
         return await this.create({user1,user2});
     }
     return null;
   } catch (error) {
        console.log(error.message);
            
   }
}
    
export const Friend = mongoose.model('Friend', friendSchema);
