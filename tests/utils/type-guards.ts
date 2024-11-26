import {
    PriceResponse,
    QuoteResponse,
    TokenInfo,
    SwapResponse,
    SwapInstructionsResponse,
    ProgramIdToLabelResponse,
    TokensResponse,
    MarketsResponse,
    NewPoolsResponse
} from "../../src"

export const isTokenInfoType = (x: unknown): x is TokenInfo => {
    return typeof x === 'object' &&
        x !== null &&
        'id' in x &&
        'mintSymbol' in x &&
        'vsToken' in x &&
        'vsTokenSymbol' in x &&
        'price' in x &&
        typeof (x as TokenInfo).price === 'number'
}

export const isPriceResponseType = (x: unknown): x is PriceResponse => {
    if (!(typeof x === 'object' &&
        x !== null &&
        'data' in x &&
        'timeTaken' in x &&
        typeof (x as PriceResponse).timeTaken === 'number')) {
        return false
    }

    const data = (x as PriceResponse).data
    return typeof data === 'object' &&
        data !== null &&
        Object.values(data).every(isTokenInfoType)
}

export const isQuoteResponseType = (x: unknown): x is QuoteResponse => {
    // Basic structure check
    if (!(typeof x === 'object' && x !== null)) return false

    const quote = x as QuoteResponse

    // Required fields with type checks
    const requiredChecks = [
        typeof quote.inputMint === 'string',
        typeof quote.inAmount === 'string',
        typeof quote.outputMint === 'string',
        typeof quote.outAmount === 'string',
        typeof quote.otherAmountThreshold === 'string',
        typeof quote.swapMode === 'string', // assuming SwapMode is a string enum
        typeof quote.slippageBps === 'number',
        typeof quote.priceImpactPct === 'string',
        Array.isArray(quote.routePlan)
    ]

    if (!requiredChecks.every(Boolean)) return false

    // Optional fields - only check type if they exist
    if ('computedAutoSlippage' in quote &&
        typeof quote.computedAutoSlippage !== 'number') return false

    if ('platformFee' in quote &&
        typeof quote.platformFee !== 'object') return false

    if ('contextSlot' in quote &&
        typeof quote.contextSlot !== 'number') return false

    if ('timeTaken' in quote &&
        typeof quote.timeTaken !== 'number') return false

    return true
}

export const isSwapResponseType = (x: unknown): x is SwapResponse => {
    if (!(typeof x === 'object' && x !== null)) return false

    const response = x as SwapResponse

    const requiredChecks = [
        typeof response.swapTransaction === 'string',
        typeof response.lastValidBlockHeight === 'number',
        typeof response.computeUnitLimit === 'number',
        typeof response.prioritizationType === 'object' &&
        typeof response.prioritizationType.computeBudget === 'object' &&
        typeof response.prioritizationType.computeBudget.microLamports === 'number' &&
        typeof response.prioritizationType.computeBudget.estimatedMicroLamports === 'number'
    ]
    if (!requiredChecks.every(Boolean)) return false

    return true
}

export const isSwapInstructionsResponseType = (x: unknown): x is SwapInstructionsResponse => {
    if (!(typeof x === 'object' && x !== null)) return false

    const response = x as SwapInstructionsResponse

    const requiredChecks = [
        // typeof response.tokenLedgerInstruction === 'object',
        Array.isArray(response.computeBudgetInstructions),
        Array.isArray(response.setupInstructions),
        Array.isArray(response.addressLookupTableAddresses),
        typeof response.swapInstruction === 'object',
        typeof response.computeUnitLimit === 'number',
        typeof response.prioritizationType === 'object' &&
        typeof response.prioritizationType.computeBudget === 'object' &&
        typeof response.prioritizationType.computeBudget.microLamports === 'number' &&
        typeof response.prioritizationType.computeBudget.estimatedMicroLamports === 'number'
    ]
    if (!requiredChecks.every(Boolean)) return false

    return true
}

export const isProgramLabelsResponseType = (x: unknown): x is ProgramIdToLabelResponse => {
    if (!(typeof x === 'object' && x !== null)) return false

    const response = x as ProgramIdToLabelResponse
    return typeof response === 'object' && Object.values(response).every(isProgramLabelType)
}

const isProgramLabelType = (x: unknown): x is string => {
    return typeof x === 'string' && x.length > 0
}

export const isTokensResponseType = (x: unknown): x is TokensResponse => {
    if (!(typeof x === 'object' && x !== null)) return false
    return Array.isArray(x) && x.every(isTokenType)
}

const isTokenType = (x: unknown): x is string => {
    return typeof x === 'string' && x.length > 0
}

export const isMarketDetailsResponseType = (x: unknown): x is MarketsResponse => {
    if (!(typeof x === 'object' && x !== null)) return false
    const response = x as MarketsResponse

    const requiredChecks = [
        typeof response.owner === 'string',
        typeof response.pubkey === 'string',
        typeof response.params === 'object',
        typeof response.status === 'string'
    ]
    if (!requiredChecks.every(Boolean)) return false

    return true
}

export const isNewPoolsResponseType = (x: unknown): x is NewPoolsResponse => {
    if (!(typeof x === 'object' && x !== null)) return false
    const response = x as NewPoolsResponse
    const requiredChecks = [
        Array.isArray(response.data),
        typeof response.status === 'string'
    ]
    if (!requiredChecks.every(Boolean)) return false

    return true
}