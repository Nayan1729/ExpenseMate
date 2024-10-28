const friendSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    friendId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    requestedAt: { type: Date, default: Date.now },
    acceptedAt: { type: Date },
}, { timestamps: true });

    // Additional methods

    friendSchema.methods.acceptRequest = function () {
        this.status = 'accepted';
        this.acceptedAt = Date.now();
        return this.save();
    };
    
    friendSchema.methods.rejectRequest = function () {
        this.status = 'rejected';
        return this.save();
    };

    
export const Friend = mongoose.model('Friend', friendSchema);
