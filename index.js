import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Account, ec, number, Provider } from "starknet";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

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

app.listen(port, () => console.log(`Server listening on port ${port}!`));
