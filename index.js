import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Account, ec, number, Provider } from "starknet";

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transferFunds = async (senderAddress, privateKey, contractAddress, recipient, amount) => {
    console.log('---- start ----');
    
    const txnInvocation = {
        contractAddress,
        entrypoint: 'transfer',
        calldata: [recipient, amount, "0"]
    };

    const maxFee = number.toBN('440005097511309');
    console.log(maxFee);

    const senderKeyPair = ec.getKeyPair(privateKey);
    const account = new Account(new Provider(), senderAddress, senderKeyPair);

    try {
        const txhash = await account.execute(txnInvocation, undefined, { maxFee });
        console.log(txhash);
        console.log('---- end ----');
        return "transfer submitted";
    } catch (error) {
        console.error("Error during transfer:", error);
        throw error;
    }
};

app.post('/transfer', async (req, res) => {
    const senderAddress = '0x70bdb4da1c7153682bd9760f3cb297addb3a15e30cc77be7194434ebaa24ad9';
    const privateKey = '1188213934273022935890293708434664722187072329437599921063646353986905980672';
    const contractAddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
    const recipient = "0x0535377e2fA496930E0358Ae7ddFDbb5aBEaAeB4EC431bdff518BC5D3150b2B";
    const amount = "10";

    try {
        const responseMessage = await transferFunds(senderAddress, privateKey, contractAddress, recipient, amount);
        res.send(responseMessage);
    } catch (error) {
        res.status(500).send("Error in processing transfer");
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
