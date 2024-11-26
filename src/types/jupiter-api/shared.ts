export interface PlatformFee {
    amount?: string;
    feeBps?: number;
}

export interface SwapInfo {
    ammKey: string;
    label?: string;
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    feeAmount: string;
    feeMint: string;
}

export interface RoutePlanStep {
    swapInfo: SwapInfo;
    percent: number;
}


export const SwapMode = {
    ExactIn: 'ExactIn',
    ExactOut: 'ExactOut'
} as const;
export type SwapMode = typeof SwapMode[keyof typeof SwapMode];