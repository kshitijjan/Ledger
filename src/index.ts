
import express, {Request, Response} from 'express';
import { incomingTransaction, fetchMyHistory } from './controllers/transaction.controller';
import { connectDB } from './config/db';
import { globalErrorHandler } from './middleware/error.middleware';
import { register } from './controllers/auth.controller';
import { requireAuth } from './middleware/auth.middleware';


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/api/healthy', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: `API server is healthy and running fine`
    })
})

app.post('/api/transaction', requireAuth, incomingTransaction)

app.get('/api/transactions/me', requireAuth, fetchMyHistory)

app.post('/api/auth/register', register);

app.use(globalErrorHandler);

const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        
    })
}
startServer();