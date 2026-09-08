import {NextFunction, Request, Response} from 'express'

const validateApiKey = (req: Request, res: Response, next: NextFunction) => {

    const clientApiKey = req.headers['x-api-key'];
    const serverApiKey = process.env.API_KEY;
    if(!clientApiKey || clientApiKey !== serverApiKey){
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized: Invalid or missing API key'
        })
    }
    next();

}

export {
    validateApiKey
}