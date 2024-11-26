export interface PriceGetRequest {
    ids: string | string[];  // comma-separated string for multiple tokens
    vsToken?: string;  // defaults to USDC
    useQNMarketCache?: boolean;
    restrictIntermediateTokens?: boolean;
}

interface TokenInfo {
    id: string;
    mintSymbol: string;
    vsToken: string;
    vsTokenSymbol: string;
    price: number;
}

export interface PriceResponse {
    data: {
        [tokenSymbol: string]: TokenInfo; 
    };
    timeTaken: number;
}
