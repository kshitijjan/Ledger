import {z} from 'zod';

const TransactionSchema = z.object({
    accountId: z.string().min(3),
    amount: z.number().positive(),
    type: z.enum(['CREDIT' , 'DEBIT'])
})
export type TransactionPayload = z.infer<typeof TransactionSchema>

export{
    TransactionSchema,   
}  