import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    members: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        role: {
            type: String,
            enum: ['admin', 'member'],
            default: 'member',
        },
        joinedAt: { type: Date, default: Date.now },
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

    // Additional methods

groupSchema.methods.addMember = function (userId, role = 'member') {
    if (!this.members.some(member => member.userId.equals(userId))) {
        this.members.push({ userId, role });
    }
    return this.save();
};

groupSchema.methods.removeMember = function (userId) {
    this.members = this.members.filter(member => !member.userId.equals(userId));
    return this.save();
};


export const Group = mongoose.model('Group', groupSchema);
