import { Transaction } from "../models/transaction.model";
import { TransactionPayload } from "../schemas/transaction.schema";

const processTransaction = async (data: TransactionPayload, userId: string) => {

    console.log(`Processing ${data.type} of $${data.amount} on account ${data.accountId} by User ${userId} `);

    const newTransaction = new Transaction({
        userId: userId,
        accountId: data.accountId,
        amount: data.amount,
        type: data.type
    })

    const savedTransaction = await newTransaction.save();

    return savedTransaction;
}

const getTransactionByAccount = async (accountId: string) => {
    console.log(`[LedgerLogic] fetching history for account: ${accountId}`);
    
    const history = await Transaction.find({accountId: accountId})
    .sort({createdAt: -1})
    .limit(50)

    return history;
}
const getMyTransactionHistory = async (userId: string, page: number, limit: number) => {
    console.log(`[LedgerService] Fetching secure history for User: ${userId}`);
    
    // The Pagination Math:
    // If page = 1, skip = (1-1)*10 = 0 items skipped.
    // If page = 2, skip = (2-1)*10 = 10 items skipped.
    const skipAmount = (page - 1) * limit;
    const history = await Transaction.find({userId: userId})
    .sort({createdAt: -1})
    .skip(skipAmount)
    .limit(limit)

    return history;
}

export {
    processTransaction,
    getTransactionByAccount ,
    getMyTransactionHistory
}