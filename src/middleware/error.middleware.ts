import {Request, Response, NextFunction} from 'express';
import { ZodError } from 'zod';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('[Error Caught]:', err.message)

    if(err instanceof ZodError){
        return res.status(400).json({
            status: 'error',
            message: 'Invalid payload data',
            issues: err.issues
        })
    }

    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    })
}

export {
    globalErrorHandler
}