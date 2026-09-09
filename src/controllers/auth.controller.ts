import { Request , Response } from 'express';
import { AuthSchema } from '../schemas/auth.schema';
import { catchAsync } from '../utils/catchAsync';
import { registerUser } from '../services/auth.service';

const register = catchAsync(async ( req: Request, res: Response) => {

    const data = AuthSchema.parse(req.body);
    const result = await registerUser(data);

    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: result
    })
})

export {
    register
}