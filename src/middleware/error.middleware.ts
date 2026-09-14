import {Request, Response, NextFunction} from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('[Error Caught]:', err.message)

    if(err instanceof ZodError){
        return res.status(400).json({
            status: 'error',
            message: 'Invalid payload data',
            issues: err.issues
        })
    }
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
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