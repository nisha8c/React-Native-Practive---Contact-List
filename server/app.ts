import express from 'express';
import cors from 'cors';
import { Request, Response, Application } from 'express';
import customers from './customers';

const app: Application = express();
app.use(express.json());
app.use(cors());

const getAllCustomersInformation = (_req: Request, res: Response) => {
    res.status(200).json(customers);
};

const getCustomerById = (_req: Request, res: Response) => {
    const id = (_req.params.id);
    const customer = customers.find(c => c.id.value === id);
    if (customer) {
        res.status(200).json(customer);
    } else {
        res.status(404).json({
            message: 'Puppy with id '+ id +' not found'
        });
    }
}

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({test: 'is working as it should'});
});

app.get('/api/customers', getAllCustomersInformation);
app.get('/api/customers/:id', getCustomerById);

export default app;
