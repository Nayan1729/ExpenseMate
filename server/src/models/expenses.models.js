const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        default: null, // Null indicates it’s an individual expense
    },
    participants: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        amountOwed: { type: Number, required: true }, // Amount this participant owes
    }],
    splitType: {
        type: String,
        enum: ['equal', 'percentage', 'exact'], // Determines the split calculation
        required: true,
    },
}, { timestamps: true });

    // Additional Methods

    expenseSchema.methods.calculateSplit = function () {
        if (this.splitType === 'equal') {
            const splitAmount = this.amount / this.participants.length;
            this.participants.forEach(participant => {
                participant.amountOwed = splitAmount;
            });
        }
        // Additional split calculations for 'percentage' and 'exact' types could go here
        return this;
    };
    

const Expense = mongoose.model('Expense', expenseSchema);
