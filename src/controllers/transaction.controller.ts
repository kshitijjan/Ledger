import express, {Request, Response} from "express";
import { getTransactionByAccount, processTransaction } from "../services/ledger.service";
import { TransactionSchema } from "../schemas/transaction.schema";

import { ZodError } from "zod";
import { fetchTransactionGif } from "../services/media.service";

const incomingTransaction = async (req: Request, res: Response) => {

    try{
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
    }

    catch(error: any){
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid data',
                issues: error.issues
            });
        }
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Internal Error'
        });
    }
}

const fetchAccountHistory = async (req: Request, res: Response) => {
    try{
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
    }
    catch(error: any){
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Internal server error'
        })
    }
}

export{
    incomingTransaction,
    fetchAccountHistory
}
