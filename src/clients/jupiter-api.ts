import {
    Rpc,
    RpcRequest,
    RpcResponse,
    RpcTransport,
    createJsonRpcApi,
    createRpc,
} from "@solana/web3.js";
import {
    JupiterApiConfig,
    JupiterApi,
    MethodConfig,
    HttpRequestType,
    JupiterMethod,
} from "../types/jupiter-api";
import { PUBLIC_JUPITER_ENDPOINT } from "../constants";
import { JupiterApiError, JupiterPaidEndpointError } from '../errors';

export class JupiterClient {
    public readonly jupiterApi: Rpc<JupiterApi>;
    private readonly endpoint: string;

    private static readonly METHOD_CONFIG: MethodConfig = {
        price: {
            httpMethod: 'GET',
            paidOnly: true
        },
        quote: { httpMethod: 'GET' },
        swap: { httpMethod: 'POST' },
        swapInstructions: {
            httpMethod: 'POST',
            path: 'swap-instructions'
        },
        programIdToLabel: {
            httpMethod: 'GET',
            path: 'program-id-to-label'
        },
        tokens: { httpMethod: 'GET' },
        markets: {
            httpMethod: 'POST',
            paidOnly: true
        },
        newPools: {
            httpMethod: 'GET',
            path: 'new-pools',
            paidOnly: true
        }
    } as const;

    constructor(config: JupiterApiConfig = {}) {
        this.endpoint = config.endpoint ?? PUBLIC_JUPITER_ENDPOINT;
        const api = createJsonRpcApi<JupiterApi>({
            requestTransformer: (request: RpcRequest) => request,
            responseTransformer: (response: RpcResponse, _request: RpcRequest) => response,
        });
        this.jupiterApi = createRpc({
            api,
            transport: this.createTransport()
        });
    }

    private getPath(method: string, config: MethodConfig[keyof MethodConfig]): string {
        return config.path || method;
    }

    private validatePaidEndpoint(method: string, config: MethodConfig[keyof MethodConfig]): void {
        if (config.paidOnly && this.isPublicEndpoint()) {
            throw new JupiterPaidEndpointError(method);
        }
    }

    private buildRequest(
        path: string,
        httpMethod: HttpRequestType,
        params: unknown
    ): { url: URL; requestOpts: RequestInit } {
        const url = new URL(`${this.endpoint}/${path}`);
        const requestOpts: RequestInit = {
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const paramsToUse = Array.isArray(params) ? params[0] : params;

        if (httpMethod === 'GET' && this.isValidParams(paramsToUse)) {
            Object.entries(paramsToUse).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
        } else if (httpMethod === 'POST') {
            requestOpts.body = JSON.stringify(paramsToUse);
        }

        return { url, requestOpts };
    }

    private isValidParams(params: unknown): params is Record<string, unknown> {
        return typeof params === 'object' && params !== null;
    }

    private createTransport(): RpcTransport {
        return async <TResponse>(...args: any): Promise<TResponse> => {
            if (!args[0]?.payload) {
                throw new JupiterApiError('Invalid RPC payload');
            }

            const { method, params } = args[0].payload as { method: string; params: unknown };
            const config: MethodConfig[JupiterMethod] = JupiterClient.METHOD_CONFIG[method as JupiterMethod];

            if (!config) {
                throw new JupiterApiError(`Unknown method: ${method}`, 400, method);
            }

            try {
                const path = this.getPath(method, config);
                this.validatePaidEndpoint(method, config);
                const { url, requestOpts } = this.buildRequest(path, config.httpMethod, params);
                const response = await fetch(url.toString(), requestOpts);

                if (!response.ok) {
                    throw new JupiterApiError(
                        `Request failed: ${response.statusText}`,
                        response.status,
                        method,
                        url.toString()
                    );
                }
                return await response.json() as TResponse;
            } catch (error) {
                // Rethrow our custom errors
                if (error instanceof JupiterApiError) {
                    throw error;
                }
                // Wrap unknown errors
                throw new JupiterApiError(
                    `Error in ${method}: ${(error as Error).message || 'Unknown error'}`,
                    500,
                    method
                );
            }
        };
    }

    private isPublicEndpoint(): boolean {
        return this.endpoint.startsWith(PUBLIC_JUPITER_ENDPOINT);
    }

    // TODO: Add WebSocket Methods
    // TODO: Implement signer at constructor
    // TODO: Process Transaction (sign/send)
    // TODO: Send w/ Jito

}
