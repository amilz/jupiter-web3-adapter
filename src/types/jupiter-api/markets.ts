export interface MarketsRequest {
    poolAddress: string;
}

export interface MarketParams {
    serumBids: string;
    serumAsks: string;
    serumEventQueue: string;
    serumCoinVaultAccount: string;
    serumPcVaultAccount: string;
    serumVaultSigner: string;
}

export interface MarketsResponse {
    owner: string;
    pubkey: string;
    params: MarketParams;
    status: string;
}


