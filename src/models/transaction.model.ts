import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
    {
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