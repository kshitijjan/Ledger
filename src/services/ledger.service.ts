import { Transaction } from "../models/transaction.model";
import { TransactionPayload } from "../schemas/transaction.schema";

const processTransaction = async (data: TransactionPayload) => {

    console.log(`Processing ${data.type} of $${data.amount} on account ${data.accountId} `);

    const newTransaction = new Transaction({
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

export {
    processTransaction,
    getTransactionByAccount 
}