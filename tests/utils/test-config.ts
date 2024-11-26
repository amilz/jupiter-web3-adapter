import { JupiterApiConfig } from "../../src";
import { config } from "dotenv";

config({ path: 'tests/.env.local' });

const TEST_ENDPOINTS = {
    metis: process.env.METIS_ENDPOINT
} as const;

export const getTestConfig = ({ usePrivateEndpoint }: { usePrivateEndpoint: boolean }): JupiterApiConfig | undefined => (usePrivateEndpoint ? {
    endpoint: TEST_ENDPOINTS.metis,
} : undefined);
