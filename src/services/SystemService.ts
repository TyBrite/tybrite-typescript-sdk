/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HealthResponse } from '../models/HealthResponse';
import type { StoreInfoResponse } from '../models/StoreInfoResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SystemService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * API information
     * Returns basic API information including version, documentation URL, and available endpoint prefixes.
     * This endpoint does not require authentication.
     *
     * @returns any API information
     * @throws ApiError
     */
    public getApiInfo(): CancelablePromise<{
        name?: string;
        version?: string;
        documentation?: string;
        endpoints?: Array<{
            prefix?: string;
            description?: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Health check
     * Returns the health status of the API gateway and all individual services.
     * This endpoint does not require authentication.
     *
     * The gateway probes each service in parallel (3-second timeout per service) and
     * rolls up an overall status:
     * - `ok` — all services healthy (HTTP 200)
     * - `degraded` — one or more services errored or timed out (HTTP 207)
     * - `down` — gateway itself unreachable (detected externally)
     *
     * @returns HealthResponse All services healthy
     * @throws ApiError
     */
    public healthCheck(): CancelablePromise<HealthResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/health',
        });
    }
    /**
     * Get comprehensive store information
     * Returns comprehensive store metadata and configuration in a single API call. Designed for
     * LLMs and AI agents to quickly understand store context without making multiple API calls.
     *
     * **Purpose:**
     * This endpoint consolidates store metadata that would normally require 10+ separate API calls:
     * - Store basic info (name, currencies, timezone)
     * - Catalog overview (products, categories, collections, brands, specifications)
     * - Pricing configuration (dynamic pricing, customer tiers, rules)
     * - Active promotions (types, counts)
     * - Payment methods (providers, configurations)
     * - Shipping zones (delivery fees, free thresholds)
     * - CMS content (posts, lookbooks)
     * - Feature flags (enabled capabilities)
     *
     * **Use Cases:**
     * - AI agents understanding store capabilities before making recommendations
     * - Admin dashboards showing store overview
     * - Integration setup wizards checking store configuration
     * - Mobile apps caching store metadata on startup
     * - Third-party tools discovering available features
     *
     * **Performance:**
     * - Cached for 5 minutes (300 seconds)
     * - Parallel data fetching for all sections
     * - Optional section filtering to reduce payload size
     * - Typical response time: 50-150ms (cached: 10-20ms)
     *
     * **Selective Loading:**
     * Use the `sections` parameter to request only specific data sections, reducing payload size
     * by 50-80% when you don't need all information.
     *
     * **Single-store only.** This endpoint describes one store. A marketplace operator key has no
     * single store here and receives `403` — use `GET /v1/marketplace/info` for the marketplace's own
     * information, or `GET /v1/marketplace/info?store_id=<merchant>` for one merchant within it.
     *
     * @returns StoreInfoResponse Store information retrieved successfully
     * @throws ApiError
     */
    public getStoreInfo({
        sections,
        cache = true,
    }: {
        /**
         * Comma-separated list of sections to include in the response. Omit to return all sections.
         *
         * **Available Sections:**
         * - `catalog` - Products, categories, collections, brands, specifications
         * - `pricing` - Dynamic pricing configuration and rules
         * - `promotions` - Active promotions and types
         * - `payments` - Payment providers and methods
         * - `shipping` - Delivery zones and fees
         * - `cms` - CMS posts and lookbooks
         * - `features` - Feature flags and capabilities
         *
         * **Note:** The `store` section is always included regardless of this parameter.
         *
         * **Examples:**
         * - `sections=catalog,features` - Only catalog and features
         * - `sections=payments,shipping` - Only payment and shipping info
         * - Omit parameter - All sections included
         *
         * **Payload Size Reduction:**
         * - Full response: ~15-25KB
         * - `catalog` only: ~8-12KB (50% reduction)
         * - `features,payments`: ~2-3KB (85% reduction)
         *
         * **SDK Usage:**
         *
         */
        sections?: string,
        /**
         * Control cache behavior. Set to `false` to bypass cache and fetch fresh data.
         *
         * **Default:** `true` (use cache if available)
         *
         * **Cache Duration:** 5 minutes (300 seconds)
         *
         * **When to Bypass Cache:**
         * - After updating store configuration
         * - After adding/removing products or categories
         * - After changing payment or shipping settings
         * - When you need real-time data
         *
         * **Cache Headers:**
         * - `X-Cache: HIT` - Response served from cache
         * - `X-Cache: MISS` - Response fetched from database
         * - `Cache-Control: public, max-age=300` - Browser/CDN caching
         *
         * **SDK Usage:**
         *
         */
        cache?: boolean,
    }): CancelablePromise<StoreInfoResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/store/info',
            query: {
                'sections': sections,
                'cache': cache,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
