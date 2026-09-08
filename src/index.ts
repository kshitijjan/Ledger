
import express, {Request, Response} from 'express';
import { incomingTransaction, fetchAccountHistory } from './controllers/transaction.controller';
import { validateApiKey } from './middleware/security.middleware';
import { connectDB } from './config/db';


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/api/healthy', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: `API server is healthy and running fine`
    })
})

app.post('/api/transaction', validateApiKey, incomingTransaction)

app.get('/api/transactions', validateApiKey, fetchAccountHistory)

const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        
    })
}
startServer();