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

const getCustomerById = (req: Request, res: Response) => {
    const id = req.params.id;
    const customer = customers.find(c => c.id.value === id);
    if (customer) {
        res.status(200).json(customer);
    } else {
        res.status(404).json({
            message: 'Customer with id '+ id +' not found'
        });
    }
}

const deleteCustomer = (req: Request, res: Response) => {
    const id = req.params.id;
    const customerToBeDeleted = customers.find(p => p.id.value === id);
    if (customerToBeDeleted) {
        customers.splice(customers.indexOf(customerToBeDeleted), 1);
        res
            .status(200)
            .json({
                message: 'Customer deleted successfully'
            });
    } else {
        res.status(404).json({
            message: 'Customer with id '+ id +' not found'
        });
    }
};

const addCustomer = (req: Request, res: Response) => {
    const customerToBeAdded = {
        gender: req.body.gender,
        name: {
            title: req.body.title,
            first: req.body.first,
            last: req.body.last
        },
        location: {
            street: {
                number: req.body.number,
                name: req.body.name
            },
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            postcode: req.body.postcode,
            coordinates: {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            },
            timezone: {
                offset: req.body.offset,
                description: req.body.description
            }
        },
        email: req.body.email,
        dob: {
            date: req.body.date,
            age: req.body.age
        },
        registered: {
            date: req.body.date,
            age: req.body.age
        },
        phone: req.body.phone,
        cell: req.body.cell,
        id: {
            name: req.body.name,
            value: req.body.value
        },
        picture: {
          large: req.body.large,
          medium: req.body.medium,
          thumbnail: req.body.thumbnail
        },
        nat: req.body.nat
    }

    customers.push(customerToBeAdded);
    res
        .status(201)
        .json({
            message: 'Customer added successfully'
        });
};



app.get('/', (req: Request, res: Response) => {
    res.status(200).json({test: 'is working as it should'});
});

app.get('/api/customers', getAllCustomersInformation);
app.get('/api/customers/:id', getCustomerById);
app.delete('/api/customers/:id', deleteCustomer);
app.post('/api/customers', addCustomer);



export default app;
