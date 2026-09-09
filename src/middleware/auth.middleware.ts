import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user? : {userId: String}
}

const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized: No token provided'
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as {userId: string};

        req.user = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized: Invalid or expired token'
        })
    }
}

export{
    requireAuth
}