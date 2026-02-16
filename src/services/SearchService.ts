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
     * Fast text-based search using
     * @returns SearchResponse Success
     * @throws ApiError
     */
    public searchProducts({
        q,
        query,
        limit = 20,
    }: {
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
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
