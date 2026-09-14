import {Request, Response} from "express";
import { calculateUserBalance, getMyTransactionHistory, getTransactionByAccount, processTransaction } from "../services/ledger.service";
import { TransactionSchema } from "../schemas/transaction.schema";
import { fetchTransactionGif } from "../services/media.service";
import { catchAsync } from "../utils/catchAsync";
import { AuthRequest } from "../middleware/auth.middleware";

const incomingTransaction = catchAsync(async (req: AuthRequest, res: Response) => {

        const data = TransactionSchema.parse(req.body);
        const userId = req.user!.userId;
        const result = await processTransaction(data, userId);

        const gifUrl = await fetchTransactionGif(data.type);
            
        res.status(201).json({
            status: 'success',
            message: 'Transaction saved to database successfully',
            transactionId: result._id,
            media: gifUrl,
            data: result
        })
})

const fetchAccountHistory = catchAsync(async (req: Request, res: Response) => {

        const {accountId} = req.query;

        if(!accountId || typeof accountId !== 'string'){
            return res.status(400).json({
                status: 'error',
                message: 'Missing or invalid accountId in query string'
            })
        }
        const transaction = await getTransactionByAccount(accountId);

        res.status(200).json({
            status: 'success',
            count: transaction.length,
            data: transaction
        });
});

const fetchMyHistory = catchAsync(async (req: AuthRequest, res: Response) => {

    const userId = req.user!.userId;

    //Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const transactions = await getMyTransactionHistory(userId, page, limit);

    res.status(200).json({
        status: 'success',
        page: page, 
        limit: limit,
        count: transactions.length,
        data: transactions
    })
})

const fetchBalace = catchAsync(async (req: AuthRequest, res: Response) => {

    const userId = req.user!.userId;
    
    const currentBalance = await calculateUserBalance(userId);

    res.status(200).json({
        status: 'success',
        data: {
            balance: currentBalance
        }
    })
})

export{
    incomingTransaction,
    fetchAccountHistory,
    fetchMyHistory,
    fetchBalace
}
