import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        accountId: {
            type: String,
            required: true,
            index: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        type: {
            type: String,
            enum: ['CREDIT', 'DEBIT'],
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Transaction = mongoose.model('Transaction', TransactionSchema)