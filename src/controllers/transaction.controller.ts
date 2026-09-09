import {Request, Response} from "express";
import { getTransactionByAccount, processTransaction } from "../services/ledger.service";
import { TransactionSchema } from "../schemas/transaction.schema";
import { fetchTransactionGif } from "../services/media.service";
import { catchAsync } from "../utils/catchAsync";

const incomingTransaction = catchAsync(async (req: Request, res: Response) => {

        const data = TransactionSchema.parse(req.body);
    
        const result = await processTransaction(data);

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

export{
    incomingTransaction,
    fetchAccountHistory
}
