const contactSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    contactName: {
        type: String,
        trim: true,
    },
    contactEmail: {
        type: String,
        trim: true,
    },
    contactPhone: {
        type: String,
        trim: true,
    },
    isRegisteredUser: { 
        type: Boolean, 
        default: false 
    }, // Tracks if the contact is already a registered user
}, { timestamps: true });

export const Contact = mongoose.model('Contact', contactSchema);
