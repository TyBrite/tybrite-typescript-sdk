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
     * Fast text-based product search. Accepts both publishable and secret API keys. When called with a marketplace operator key, searches products across all merchants in the marketplace. With a marketplace operator key, pass `?store_id=<merchant>` to narrow results to a single merchant.
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
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Semantic search
     * Semantic search using embeddings and cosine similarity.
     * Understands natural language queries like "wireless headphones with noise cancellation".
     *
     * **✅ BOTH KEY TYPES SUPPORTED**
     *
     * This endpoint works with both secret keys (tybrite_sk_*) and publishable keys (tybrite_pk_*).
     *
     * **Note:** Despite using POST method (to support complex request bodies with parameters),
     * this is a read-only operation. Publishable keys are allowed for client-side search functionality.
     *
     * **Marketplace:** When called with a marketplace operator key, searches products across all
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
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
