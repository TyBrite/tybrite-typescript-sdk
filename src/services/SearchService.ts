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
     * **Typo tolerance.** When exact matching finds nothing, the query is retried against a
     * similarity match over product names and brands, so a misspelling still reaches the product
     * — "snoboard" finds the snowboards. Those results carry a `matchReason` of `Similar name` or
     * `Similar brand` rather than `Text match`, so a storefront can label them ("showing results
     * for …") instead of presenting an approximate match as an exact one. Exact matches always
     * rank first: the fallback only runs when there were none, so a query that already worked is
     * unaffected.
     *
     *
     * **Merchandising.** A merchant can place results deliberately from their admin, for a query or a
     * family of queries: **pin** a product to the top, **bury** one to the bottom, or **boost** one so
     * it lifts past near neighbours without jumping the queue. Rules can run between dates, and a
     * higher-priority rule wins where two overlap.
     *
     * Rules apply **after** ranking and only reorder — they never introduce a product the query did not
     * match, and a pinned product that is deleted, offline or otherwise not sellable does not appear.
     * Pinned and boosted results carry a `matchReason` of `Featured by the store`, so a storefront can
     * label a deliberate placement rather than presenting it as an earned one. Nothing needs to be
     * requested or configured on the client: the ordering already reflects the rules, and a store with
     * none behaves exactly as before.
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
     *
     * **Merchandising.** A merchant can place results deliberately from their admin, for a query or a
     * family of queries: **pin** a product to the top, **bury** one to the bottom, or **boost** one so
     * it lifts past near neighbours without jumping the queue. Rules can run between dates, and a
     * higher-priority rule wins where two overlap.
     *
     * Rules apply **after** ranking and only reorder — they never introduce a product the query did not
     * match, and a pinned product that is deleted, offline or otherwise not sellable does not appear.
     * Pinned and boosted results carry a `matchReason` of `Featured by the store`, so a storefront can
     * label a deliberate placement rather than presenting it as an earned one. Nothing needs to be
     * requested or configured on the client: the ordering already reflects the rules, and a store with
     * none behaves exactly as before.
     *
     * **When to use:** prefer this over the text `GET /v1/search` (`searchProducts`) when the query
     * is conversational or descriptive. Two tuning options:
     * - **`minScore`** (default `0.3`, range `0.0–1.0`) raises the similarity floor — increase it
     * (e.g. `0.5`) to return only strong matches and suppress loosely-related products.
     * - **`personalize`** (default `false`) nudges ranking toward a signed-in shopper's preferences
     * when you also identify that shopper with any of `x-auth-token`, `x-external-auth`, or
     * `x-idp-token`; relevance stays primary
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
        xAuthToken,
        xExternalAuth,
        xIdpToken,
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
             * When `true` and the request is made on behalf of a signed-in customer (identify the
             * shopper with any of `x-auth-token`, `x-external-auth`, or `x-idp-token`), results are nudged toward the
             * shopper's preferences while keeping query relevance primary (relevance is
             * blended with preference, not replaced). Without a customer session, or for a
             * shopper with no preference signal yet, ranking is by query relevance only.
             *
             */
            personalize?: boolean;
        },
        /**
         * Session token of a customer signed in through Galactic Core. Only used when `personalize` is true, to rank results toward that shopper's preferences. Optional everywhere else, and an absent or invalid credential simply returns unpersonalized results rather than an error.
         */
        xAuthToken?: string,
        /**
         * Signed identity assertion for a customer authenticated with your own identity provider. Serves the same purpose as `x-auth-token`; send whichever matches how the shopper signed in.
         */
        xExternalAuth?: string,
        /**
         * A raw token from your own identity provider, which Galactic Core forwards to the store's configured Auth verifier. Serves the same purpose as `x-auth-token`.
         */
        xIdpToken?: string,
    }): CancelablePromise<SearchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/search',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Type-ahead suggestions
     * Suggestions for a partial query, for a search box that completes as the shopper types.
     *
     * Suggestions are drawn from what the store actually sells — product names, brands, and the
     * merchant's own subcategories — so there is no keyword list to configure and nothing that can
     * drift from the catalogue. Each suggestion carries a `kind` (`product`, `brand`, or
     * `subcategory`) so a storefront can group or badge them, and a `score` for ordering.
     *
     * Prefixes match first, with similarity as a fallback, so a suggestion still appears when the
     * first characters are already mistyped.
     *
     * **Auth:** accepts a publishable (`tybrite_pk_*`) key, so it is safe to call from client-side
     * storefront code on every keystroke. Requires a store-scoped key — marketplace operator keys
     * are rejected.
     *
     * **Fewer than two characters** returns an empty `suggestions` array with a `200`, not an
     * error: a shopper mid-word has not done anything wrong.
     *
     * @returns any Suggestions for the partial query
     * @throws ApiError
     */
    public autocompleteSearch({
        q,
        prefix,
        limit = 8,
    }: {
        /**
         * The partial query typed so far. Either `q` or `prefix` is required.
         */
        q?: string,
        /**
         * Alternative spelling of `q`; use whichever reads better in your client.
         */
        prefix?: string,
        /**
         * Maximum suggestions to return.
         */
        limit?: number,
    }): CancelablePromise<{
        /**
         * The prefix that was searched.
         */
        query?: string;
        suggestions?: Array<{
            /**
             * The completed term to offer the shopper.
             */
            suggestion?: string;
            /**
             * What the suggestion refers to.
             */
            kind?: 'product' | 'brand' | 'subcategory';
            /**
             * Relevance, highest first.
             */
            score?: number;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/search/autocomplete',
            query: {
                'q': q,
                'prefix': prefix,
                'limit': limit,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
            },
        });
    }
}
