export interface TokenMetadata {
    address: string;
    decimals: number;
    lpAmount: number;
}

export interface PoolData {
    lpSignature: string;
    lpSigner: string;
    lpAddress: string;
    timestamp: string;
    tokenAddress: string;
    tokenMeta: TokenMetadata;
    quoteAddress: string;
    quoteMeta: TokenMetadata;
    exchange: string;
}

export interface NewPoolsResponse {
    data: PoolData[];
    status: string;
}