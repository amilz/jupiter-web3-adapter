
import { describe, it, expect, beforeAll } from 'vitest'
import { JupiterApi, JupiterClient } from '../src'
import { getTestConfig } from './utils/test-config'
import { Rpc } from '@solana/web3.js'
import { JupiterPaidEndpointError } from '../src/errors'
import { isMarketDetailsResponseType, isNewPoolsResponseType, isPriceResponseType, isProgramLabelsResponseType, isQuoteResponseType, isSwapInstructionsResponseType, isSwapResponseType, isTokenInfoType, isTokensResponseType } from './utils/type-guards'

describe('JupiterClient', () => {
    let jupiterApiPublic: Rpc<JupiterApi>;
    let jupiterApiPrivate: Rpc<JupiterApi>;

    beforeAll(() => {
        let jupiterClientPublic = new JupiterClient(getTestConfig({ usePrivateEndpoint: false }))
        let jupiterClientPrivate = new JupiterClient(getTestConfig({ usePrivateEndpoint: true }))
        jupiterApiPublic = jupiterClientPublic.jupiterApi
        jupiterApiPrivate = jupiterClientPrivate.jupiterApi
    })

    it('should create a client instance', () => {
        expect(jupiterApiPublic).toBeDefined()
        expect(jupiterApiPrivate).toBeDefined()
    })

    describe('/price endpoint', () => {
        it('should fetch token prices on private endpoint', async () => {
            const prices = await jupiterApiPrivate.price({
                ids: ['SOL', 'BONK']
            }).send()

            expect(isPriceResponseType(prices)).toBe(true)
            expect(isTokenInfoType(prices.data['SOL'])).toBe(true)
            expect(isTokenInfoType(prices.data['BONK'])).toBe(true)
        })

        it('should throw JupiterPaidEndpointError on public endpoint', async () => {
            await expect(
                jupiterApiPublic.price({
                    ids: ['SOL', 'BONK']
                }).send()
            ).rejects.toBeInstanceOf(JupiterPaidEndpointError)
        })
    })

    describe('/quote endpoint', () => {
        it('should fetch a valid quote', async () => {
            const quote = await jupiterApiPublic.quote({
                inputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                outputMint: "So11111111111111111111111111111111111111112",
                amount: 10 * 1e6,
            }).send()
            expect(isQuoteResponseType(quote)).toBe(true)
        })
    })

    describe('/swap and /swap-instructions endpoints', () => {
        it('should generate valid swap transaction', async () => {
            const quote = await jupiterApiPrivate.quote({
                inputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                outputMint: "So11111111111111111111111111111111111111112",
                amount: 10 * 1e6,
            }).send()

            const swap = await jupiterApiPrivate.swap({
                quoteResponse: quote,
                userPublicKey: "25mYnjJ2MXHZH6NvTTdA63JvjgRVcuiaj6MRiEQNs1Dq",
                prioritizationFeeLamports: 'auto',
                dynamicComputeUnitLimit: true
            }).send()

            expect(isSwapResponseType(swap)).toBe(true)
        })
        it('should generate valid swap instructions', async () => {
            const quote = await jupiterApiPrivate.quote({
                inputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                outputMint: "So11111111111111111111111111111111111111112",
                amount: 10 * 1e6,
            }).send()

            const swap = await jupiterApiPrivate.swapInstructions({
                quoteResponse: quote,
                userPublicKey: "25mYnjJ2MXHZH6NvTTdA63JvjgRVcuiaj6MRiEQNs1Dq",
                prioritizationFeeLamports: 'auto',
                dynamicComputeUnitLimit: true
            }).send()

            expect(isSwapInstructionsResponseType(swap)).toBe(true)
        })
    })

    describe('/programIdToLabel endpoint', () => {
        it('should fetch program labels', async () => {
            const programLabels = await jupiterApiPrivate.programIdToLabel().send()
            expect(isProgramLabelsResponseType(programLabels)).toBe(true)
        })
    })

    describe('/tokens endpoint', () => {
        it('should fetch tokens', { timeout: 15000 }, async () => {
            const tokens = await jupiterApiPrivate.tokens({}).send()
            console.log(tokens)
            expect(isTokensResponseType(tokens)).toBe(true)
        })
    })

    describe('/markets endpoint', () => {
        it('should fetch market details on private endpoint', async () => {
            const marketDetails = await jupiterApiPrivate.markets({
                poolAddress: "5y2QYKY8gQCcmG6jy4fc7wFg8L5SW7bkyvMH3jUTqBdy",
            }).send()
            expect(isMarketDetailsResponseType(marketDetails)).toBe(true)
        })
        it('should throw JupiterPaidEndpointError on public endpoint', async () => {
            await expect(
                jupiterApiPublic.markets({
                    poolAddress: "5y2QYKY8gQCcmG6jy4fc7wFg8L5SW7bkyvMH3jUTqBdy",
                }).send()
            ).rejects.toBeInstanceOf(JupiterPaidEndpointError)
        })

    })

    describe('/newPools endpoint', () => {
        it('should fetch new pools on private endpoint', async () => {
            const newPools = await jupiterApiPrivate.newPools().send()
            expect(isNewPoolsResponseType(newPools)).toBe(true)
        })
        it('should throw JupiterPaidEndpointError on public endpoint', async () => {
            await expect(
                jupiterApiPublic.newPools().send()
            ).rejects.toBeInstanceOf(JupiterPaidEndpointError)
        })
    })
})