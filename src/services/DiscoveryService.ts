/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiscoveryResponse } from '../models/DiscoveryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DiscoveryService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Most-viewed products (windowed)
     * The store's most-viewed products over a time window, ranked by view count. Powers a
     * "Popular now" homepage shelf or a "N people viewed this" PDP badge.
     *
     * Publishable-key accessible; available on every plan. Returns product ids + a `score` (the
     * view count in the window) — hydrate the product details from the Products API. Results are
     * cached briefly, so counts reflect near-real-time activity, not the live millisecond.
     *
     * @returns DiscoveryResponse Ranked most-viewed products for the window.
     * @throws ApiError
     */
    public getMostViewedProducts({
        windowHours = 24,
        limit = 12,
    }: {
        /**
         * The ranking window in hours. One of `1`, `24`, `168`, `720`. Defaults to `24`.
         */
        windowHours?: 1 | 24 | 168 | 720,
        /**
         * Max products to return (1–50).
         */
        limit?: number,
    }): CancelablePromise<DiscoveryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/discovery/most-viewed',
            query: {
                'window_hours': windowHours,
                'limit': limit,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
                500: `Internal server error. A 5xx response never carries \`details\`.`,
            },
        });
    }
    /**
     * Most-added-to-cart products (windowed)
     * The store's most-added-to-cart products over a time window, ranked by add-to-cart count. A
     * strong purchase-intent signal — use it for a "Trending in carts" section or urgency cues.
     *
     * Publishable-key accessible; available on every plan. Returns product ids + a `score` (the
     * add-to-cart count in the window).
     *
     * @returns DiscoveryResponse Ranked most-added-to-cart products for the window.
     * @throws ApiError
     */
    public getMostAddedToCartProducts({
        windowHours = 24,
        limit = 12,
    }: {
        /**
         * The ranking window in hours. One of `24`, `168`. Defaults to `24`.
         */
        windowHours?: 24 | 168,
        limit?: number,
    }): CancelablePromise<DiscoveryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/discovery/most-added-to-cart',
            query: {
                'window_hours': windowHours,
                'limit': limit,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
                500: `Internal server error. A 5xx response never carries \`details\`.`,
            },
        });
    }
    /**
     * Best-converting products (windowed)
     * The store's best-converting products over a time window, ranked by view→purchase ratio
     * (units purchased ÷ product views). Surfaces high-intent "customer favorites" — products that
     * convert, not merely products that get traffic. Products with fewer than 5 views in the window
     * are excluded so a tiny sample can't top the list.
     *
     * **Minimum results.** Because the five-view threshold can leave this list very short on a new or
     * low-traffic store, the response is topped up to at least 8 products (capped at `limit`, and at
     * the store's active product count) by backfilling — in order — from trending, engagement signals
     * (views/adds-to-cart), featured products, and newest arrivals, de-duplicated against the list.
     *
     * Publishable-key accessible; available on every plan. Returns product ids + a `score` (the
     * view→purchase ratio; a score above 1 means more units sold than distinct views recorded).
     *
     * @returns DiscoveryResponse Ranked best-converting products for the window.
     * @throws ApiError
     */
    public getBestConvertingProducts({
        windowHours = 168,
        limit = 12,
    }: {
        /**
         * The ranking window in hours. One of `168`, `720`. Defaults to `168`.
         */
        windowHours?: 168 | 720,
        limit?: number,
    }): CancelablePromise<DiscoveryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/discovery/best-converting',
            query: {
                'window_hours': windowHours,
                'limit': limit,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
                500: `Internal server error. A 5xx response never carries \`details\`.`,
            },
        });
    }
}
