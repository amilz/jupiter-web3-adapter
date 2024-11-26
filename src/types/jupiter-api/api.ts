import {
    QuoteGetRequest, QuoteResponse,
    PriceGetRequest, PriceResponse,
    SwapRequest, SwapResponse, SwapInstructionsResponse,
    ProgramIdToLabelResponse,
    TokensRequest, TokensResponse,
    MarketsRequest, MarketsResponse,
    NewPoolsResponse,
} from ".";

export type JupiterApi = {
    quote(params: QuoteGetRequest): Promise<QuoteResponse>;
    price(params: PriceGetRequest): Promise<PriceResponse>;
    swap(params: SwapRequest): Promise<SwapResponse>;
    swapInstructions(params: SwapRequest): Promise<SwapInstructionsResponse>;
    programIdToLabel(): Promise<ProgramIdToLabelResponse>;
    tokens(params: TokensRequest): Promise<TokensResponse>;
    markets(params: MarketsRequest): Promise<MarketsResponse>;
    newPools(): Promise<NewPoolsResponse>;
}

export type JupiterMethod = keyof JupiterApi;
type PaidMethod = Extract<JupiterMethod, 'price' | 'markets' | 'newPools'>;
export type HttpRequestType = 'GET' | 'POST';
export type MethodConfig = {
    [K in JupiterMethod]: {
        httpMethod: HttpRequestType;
        paidOnly?: K extends PaidMethod ? true : false;
        path?: string;
    }
}

export interface JupiterApiConfig {
    endpoint?: string;
}
