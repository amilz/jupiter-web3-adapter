export class JupiterApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public method?: string,
        public url?: string
    ) {
        super(message);
        this.name = 'JupiterApiError';
    }
}

export class JupiterPaidEndpointError extends JupiterApiError {
    constructor(method: string) {
        super(
            `Method ${method} requires a paid subscription to Jupiter V6 Swap API.\n` +
            'Upgrade at https://marketplace.quicknode.com/add-on/metis-jupiter-v6-swap-api',
            403,
            method
        );
        this.name = 'JupiterPaidEndpointError';
    }
}