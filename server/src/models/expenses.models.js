import mongoose,{model} from "mongoose";
const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    category : {
      type:String,
      required:true,
      default:'other'  
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
        enum: ['equally', 'percentage', 'exact'], // Determines the split calculation
        required: true,
    },
}, { timestamps: true });

    // Additional Methods

    expenseSchema.methods.calculateSplit =async function () {
        if (this.splitType === 'equally') {
            const splitAmount = this.amount / this.participants.length;
            this.participants.forEach(participant => {
                participant.amountOwed = splitAmount;
            });
        }
        await this.save();
        // Additional split calculations for 'percentage' and 'exact' types could go here
        return this;
    };

export const  Expense = model('Expense', expenseSchema);
