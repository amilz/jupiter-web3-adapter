import { PlatformFee, RoutePlanStep, SwapMode } from "./shared.js";

export interface QuoteGetRequest {
    inputMint: string;
    outputMint: string;
    amount: number;
    slippageBps?: number;
    autoSlippage?: boolean;
    autoSlippageCollisionUsdValue?: number;
    computeAutoSlippage?: boolean;
    maxAutoSlippageBps?: number;
    swapMode?: SwapMode;
    dexes?: Array<string>;
    excludeDexes?: Array<string>;
    restrictIntermediateTokens?: boolean;
    onlyDirectRoutes?: boolean;
    asLegacyTransaction?: boolean;
    platformFeeBps?: number;
    maxAccounts?: number;
    minimizeSlippage?: boolean;
    preferLiquidDexes?: boolean;
}

export interface QuoteResponse {
    inputMint: string;
    inAmount: string;
    outputMint: string;
    outAmount: string;
    otherAmountThreshold: string;
    swapMode: SwapMode;
    slippageBps: number;
    computedAutoSlippage?: number;
    platformFee?: PlatformFee;
    priceImpactPct: string;
    routePlan: Array<RoutePlanStep>;
    contextSlot?: number;
    timeTaken?: number;
}
