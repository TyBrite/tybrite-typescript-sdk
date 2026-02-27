/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
     * Returns the health status of the API gateway.
     * This endpoint does not require authentication.
     *
     * @returns any Service is healthy
     * @throws ApiError
     */
    public healthCheck(): CancelablePromise<{
        status?: string;
        timestamp?: string;
        version?: string;
        service?: string;
    }> {
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
         * ```typescript
         * // Get full response object (all sections)
         * const fullInfo = await client.store.getStoreInfo();
         * console.log(fullInfo.store.name);
         * console.log(fullInfo.catalog.products.total);
         *
         * // Get filtered response (specific sections only)
         * const catalogInfo = await client.store.getStoreInfo({
             * sections: ['catalog', 'features']
             * });
             *
             * // Destructure to extract specific section directly
             * // (JavaScript destructuring - extracts 'features' property from response)
             * const { features } = await client.store.getStoreInfo({
                 * sections: ['features']
                 * });
                 * if (features.multi_currency) {
                     * // Use currency-aware endpoints
                     * }
                     * ```
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
                     * ```typescript
                     * // Use cache (default)
                     * const cached = await client.store.getStoreInfo();
                     *
                     * // Bypass cache for fresh data
                     * const fresh = await client.store.getStoreInfo({ cache: false });
                     * ```
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
                            500: `Internal server error`,
                        },
                    });
                }
            }
