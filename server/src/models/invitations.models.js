import mongoose from "mongoose"
import crypto from "crypto"
const invitationSchema = new mongoose.Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    receiverEmail: { 
        type: String, 
        required: true 
    },
    token: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    },
    expiresAt: { 
        type: Date ,
        required:true
    }
});

invitationSchema.methods.generateToken = function() {

    this.token = crypto.randomBytes(16).toString('hex');
    this.expiresAt =  new Date(Date.now()+ 7*24*60*60*1000); // 7 dayd
    return this.token;
};

invitationSchema.statics.getInvitation = async function(token) {
    return await this.findOne({ token, status: 'pending' });
};

invitationSchema.statics.acceptRequest = async function (token) {
    // Find the invitation with the provided token and a 'pending' status
    const invitation = await this.findOne({ token, status: 'pending' });
    
    // Check if invitation exists
    if (!invitation) {
        throw new Error("Invitation not found or already accepted.");
    }
    
    // Update the status to 'accepted' and save the document
    invitation.status = 'accepted'
    console.log("Invitation");
    console.log(invitation);
    
    ;
    await invitation.save();
    
    return invitation;
};


// invitationSchema.statics.rejectRequest =async function (token) {
//     const invitation = await this.findOne({token})
//     this.status = 'declined';
//     return this.save();
// };

export const Invitation = mongoose.model("invitation",invitationSchema);
