/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResponse } from '../models/SearchResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SearchService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Simple text search
     * Fast text-based product search matching the query against product names, brands, and
     * descriptions in the store's catalog. Returns a ranked list of matches with a relevance
     * `score` and a human-readable `matchReason`.
     *
     * **Auth:** accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys, so
     * it is safe to call directly from client-side storefront code — no customer session required.
     *
     * **When to use:** use this GET endpoint for fast type-ahead and keyword search where exact
     * term matching is enough. For natural-language intent ("wireless headphones with noise
     * cancellation"), use the semantic `POST /v1/search` (`semanticSearch`) instead, which scores
     * by meaning rather than literal terms.
     *
     * **Marketplace:** when called with a marketplace operator key, searches products across all
     * merchants in the marketplace; pass `?store_id=<merchant>` to narrow results to a single
     * merchant.
     *
     * @returns SearchResponse Success
     * @throws ApiError
     */
    public searchProducts({
        storeId,
        q,
        query,
        limit = 20,
    }: {
        /**
         * Marketplace operator key only. Narrow the marketplace search to a single merchant's products. Ignored when using a single-store key.
         */
        storeId?: string,
        /**
         * Search query (alternative to 'query' parameter)
         */
        q?: string,
        /**
         * Search query (alternative to 'q' parameter)
         */
        query?: string,
        /**
         * Maximum number of results to return
         */
        limit?: number,
    }): CancelablePromise<SearchResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/search',
            query: {
                'store_id': storeId,
                'q': q,
                'query': query,
                'limit': limit,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Semantic search
     * Semantic (meaning-based) product search powered by AI embeddings. Understands natural-language
     * queries like "wireless headphones with noise cancellation" — matching shopper intent against
     * product meaning rather than literal keyword overlap. Results carry a similarity `score` and a
     * `matchReason`.
     *
     * **Auth:** works with both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys.
     * Despite using `POST` (to carry the structured request body), this is a **read-only** operation,
     * so publishable keys are allowed for client-side storefront search.
     *
     * **When to use:** prefer this over the text `GET /v1/search` (`searchProducts`) when the query
     * is conversational or descriptive. Two tuning options:
     * - **`minScore`** (default `0.3`, range `0.0–1.0`) raises the similarity floor — increase it
     * (e.g. `0.5`) to return only strong matches and suppress loosely-related products.
     * - **`personalize`** (default `false`) nudges ranking toward a signed-in shopper's preferences
     * when you also pass that shopper's session token as `x-auth-token`; relevance stays primary
     * (it is blended, not replaced). Without a customer session it has no effect.
     *
     * **Marketplace:** when called with a marketplace operator key, searches products across all
     * merchants in the marketplace.
     *
     * @returns SearchResponse Success
     * @throws ApiError
     */
    public semanticSearch({
        requestBody,
    }: {
        requestBody: {
            /**
             * Natural language search query
             */
            query: string;
            /**
             * Maximum number of results to return
             */
            limit?: number;
            /**
             * Minimum similarity score threshold (0.0 to 1.0)
             */
            minScore?: number;
            /**
             * When `true` and the request is made on behalf of a signed-in customer (pass the
             * customer's session token as `x-auth-token`), results are nudged toward the
             * shopper's preferences while keeping query relevance primary (relevance is
             * blended with preference, not replaced). Without a customer session, or for a
             * shopper with no preference signal yet, ranking is by query relevance only.
             *
             */
            personalize?: boolean;
        },
    }): CancelablePromise<SearchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/search',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
