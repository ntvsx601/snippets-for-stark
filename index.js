import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Account, ec, number, Provider } from "starknet";
import dotenv from 'dotenv';
import config from './config';

import transferHandler from './handlers/transferHandler';
import transactionHistoryHandler from './handlers/transactionHistoryHandler';
import healthCheckHandler from './handlers/healthCheckHandler';

dotenv.config();

const app = express();
const port = config.port;


// Logging Middleware for Request Details
app.use((req, res, next) => {
    console.log(`[Log] ${new Date().toISOString()} - ${req.method} request at ${req.url}`);
    next();
});


// Logging Middleware
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Helper Functions
async function transferFunds(senderAddress, privateKey, contractAddress, recipient, amount) {
    // ... existing transferFunds function ...
}

// Validation Middleware
const validateTransferInput = (req, res, next) => {
    // Add validation logic here
    next();
};


// Validation Middleware for Transfer Requests
const validateTransferRequest = (req, res, next) => {
    const { senderAddress, recipient, amount } = req.body;
    if (!senderAddress || !recipient || !amount) {
        return res.status(400).send('Missing required fields: senderAddress, recipient, amount');
    }
    next();
};

// Routes
app.post('/transfer', validateTransferInput, async (req, res, next) => {
    // ... existing transfer route ...
});

app.get('/balance/:address', async (req, res, next) => {
    const { address } = req.params;
    // Implement logic to check balance
    res.send(`Balance for ${address}: [balance here]`);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.get('/transaction-history/:address', async (req, res, next) => {
    const { address } = req.params;
    // Logic to fetch transaction history for the address
    res.send(`Transaction history for ${address}`);
});

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Routes (now moved to separate handlers)
// Modularized Route Handlers
// app.post('/transfer', validateTransferRequest, transferHandler);
// app.get('/transaction-history/:address', transactionHistoryHandler);
// app.get('/health', healthCheckHandler);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
