# Jupiter Solana Web3.js 2.0 Adapter
Jupiter API For [Solana Web3.js 2.0+](https://github.com/solana-labs/solana-web3.js)
Optimized for use with [QuickNode Metis Jupiter API](https://marketplace.quicknode.com/add-on/metis-jupiter-v6-swap-api)

```ts
import { JupiterClient } from "./src";

async function main() {
    const { jupiterApi } = new JupiterClient({ 
        // Replace with your QuickNode Metis Jupiter API endpoint
        // Or leave empty to use public endpoint (some methods not avaialble)
        endpoint: 'https://jupiter-swap-api.quiknode.pro/CHANGEME' 
    });

    // Fetch quote
    const quote = await jupiterApi.quote({
        inputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        outputMint: "So11111111111111111111111111111111111111112",
        amount: 10 * 1e6,
    }).send();
    console.log(quote);

    // Fetch swap instructions from a quote
    const swap = await jupiterApi.swapInstructions({
        quoteResponse: quote,
        userPublicKey: "25mYnjJ2MXHZH6NvTTdA63JvjgRVcuiaj6MRiEQNs1Dq",
        prioritizationFeeLamports: 'auto',
        dynamicComputeUnitLimit: true
    }).send();
    console.log(swap);

    // Fetch price of multiple tokens
    const prices = await jupiterApi.price({
        ids: ['SOL', 'BONK']
    }).send();
    console.log(prices);

    // Fetch program labels
    const programLabels = await jupiterApi.programIdToLabel().send();
    console.log(programLabels);

    // Fetch tokens
    const tokens = await jupiterApi.tokens({}).send();
    console.log(tokens);

    // Fetch market details
    const marketDetails = await jupiterApi.markets({
        poolAddress: "5y2QYKY8gQCcmG6jy4fc7wFg8L5SW7bkyvMH3jUTqBdy",
    }).send();
    console.log(marketDetails);

    // Fetch new pools
    const newPools = await jupiterApi.newPools().send();
    console.log(newPools);
}

main();
```

## Running tests

To run tests, you will need a Metis Jupiter API endpoint. You can obtain one by following the instructions [here](https://marketplace.quicknode.com/add-on/metis-jupiter-v6-swap-api).

#### Install Dependencies

```
npm install
```

#### Create .env.local

Rename `.env.example` to `.env.local`

Update Metis URL

```sh
METIS_ENDPOINT=https://jupiter-swap-api.quiknode.pro/CHANGEME
```

#### Run Tests

```
npm test
```