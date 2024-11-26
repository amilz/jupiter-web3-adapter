import { QuoteResponse } from "./quote.js";

export interface SwapRequest {
    userPublicKey: string;
    wrapAndUnwrapSol?: boolean;
    useSharedAccounts?: boolean;
    feeAccount?: string;
    computeUnitPriceMicroLamports?: SwapRequestComputeUnitPriceMicroLamports;
    prioritizationFeeLamports?: SwapRequestPrioritizationFeeLamports;
    asLegacyTransaction?: boolean;
    useTokenLedger?: boolean;
    destinationTokenAccount?: string;
    dynamicComputeUnitLimit?: boolean;
    skipUserAccountsRpcCalls?: boolean;
    programAuthorityId?: number;
    allowOptimizedWrappedSolTokenAccount?: boolean;
    quoteResponse: QuoteResponse;
    dynamicSlippage?: SwapRequestDynamicSlippage;
    blockhashSlotsToExpiry?: number;
    correctLastValidBlockHeight?: boolean;
}

export interface SwapResponse {
    swapTransaction: string;
    lastValidBlockHeight: number;
    prioritizationFeeLamports?: number;
    dynamicSlippageReport?: SwapResponseDynamicSlippageReport;
    computeUnitLimit: number;
    simulationError?: string;
    prioritizationType: {
        computeBudget: { microLamports: number, estimatedMicroLamports: number }
    }
}

export interface SwapRequestDynamicSlippage {
    minBps?: number;
    maxBps?: number;
}


export type SwapRequestPrioritizationFeeLamports = 'auto' | { priorityLevelWithMaxLamports: SwapRequestPrioritizationFeeLamportsAnyOfPriorityLevelWithMaxLamports };

export interface SwapRequestComputeUnitPriceMicroLamports {
}


export interface SwapRequestPrioritizationFeeLamportsAnyOfPriorityLevelWithMaxLamports {
    global?: boolean;
    maxLamports?: number;
    priorityLevel?: SwapRequestPrioritizationFeeLamportsAnyOfPriorityLevelWithMaxLamportsPriorityLevelEnum;
}


export const SwapRequestPrioritizationFeeLamportsAnyOfPriorityLevelWithMaxLamportsPriorityLevelEnum = {
    Medium: 'medium',
    High: 'high',
    VeryHigh: 'veryHigh'
} as const;
export type SwapRequestPrioritizationFeeLamportsAnyOfPriorityLevelWithMaxLamportsPriorityLevelEnum = typeof SwapRequestPrioritizationFeeLamportsAnyOfPriorityLevelWithMaxLamportsPriorityLevelEnum[keyof typeof SwapRequestPrioritizationFeeLamportsAnyOfPriorityLevelWithMaxLamportsPriorityLevelEnum];

export interface SwapResponseDynamicSlippageReport {
    amplificationRatio?: string;
    otherAmount?: number;
    simulatedIncurredSlippageBps?: number;
    slippageBps?: number;
    categoryName?: SwapResponseDynamicSlippageReportCategoryNameEnum;
    heuristicMaxSlippageBps?: number;
}
export const SwapResponseDynamicSlippageReportCategoryNameEnum = {
    Stable: 'stable',
    Lst: 'lst',
    Bluechip: 'bluechip',
    Verified: 'verified'
} as const;
export type SwapResponseDynamicSlippageReportCategoryNameEnum = typeof SwapResponseDynamicSlippageReportCategoryNameEnum[keyof typeof SwapResponseDynamicSlippageReportCategoryNameEnum];

export interface SwapInstructionsResponse {
    tokenLedgerInstruction?: Instruction;
    computeBudgetInstructions: Array<Instruction>;
    setupInstructions: Array<Instruction>;
    swapInstruction: Instruction;
    cleanupInstruction?: Instruction;
    addressLookupTableAddresses: Array<string>;
    prioritizationFeeLamports?: number;
    dynamicSlippageReport?: SwapResponseDynamicSlippageReport;
    computeUnitLimit: number;
    simulationError?: string;
    prioritizationType: {
        computeBudget: { microLamports: number, estimatedMicroLamports: number }
    }
}
export interface Instruction {
    programId: string;
    accounts: Array<AccountMeta>;
    data: string;
}
export interface AccountMeta {
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
}