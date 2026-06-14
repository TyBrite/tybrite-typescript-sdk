/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RecommendationResponse } from '../models/RecommendationResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RecommendationsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get product recommendations
     * AI-powered product recommendations. Supported types:
     * - **similar**: Products similar to a given product
     * - **also-bought**: Frequently purchased together. Each item indicates whether it is a
     * complement (commonly bought alongside) or an alternative.
     * - **next**: The products a shopper is most likely to view or add next, given what they have
     * viewed/added in the current session. Pass `sessionId` (the worker anchors on the
     * shopper's most recent product this session) and/or an explicit `productId` anchor. Falls
     * back to also-bought, then trending, when there is no session signal.
     * - **trending**: Currently trending products
     * - **new**: Recently added products
     * - **personalized**: Based on a customer's preferences
     * - **bundle**: Bundle suggestions. Items that complement the product are surfaced ahead of
     * alternatives.
     *
     * **⚠️ SECRET KEY REQUIRED**
     *
     * This endpoint requires a secret key (tybrite_sk_*). Publishable keys will return 403 Forbidden.
     *
     * **Why Secret Key?** Recommendation generation uses computational resources and accesses
     * machine learning models that should be protected from unauthorized use. This prevents abuse
     * and ensures fair resource allocation.
     *
     * **Marketplace operator keys.** With a marketplace operator key, recommendations are computed
     * across all merchants in the marketplace; supported types: trending, new, also-bought,
     * similar, personalized, bundle, next. Each item is stamped with its source merchant
     * (`merchant_store_id`).
     *
     * @returns RecommendationResponse Success
     * @throws ApiError
     */
    public getRecommendations({
        requestBody,
    }: {
        requestBody: {
            type: 'similar' | 'also-bought' | 'next' | 'trending' | 'new' | 'personalized' | 'bundle';
            /**
             * Required when type is `similar`, `also-bought`, or `bundle`. For `next`, an optional explicit anchor. Must reference an existing product in the store; otherwise 404 is returned.
             */
            productId?: string;
            /**
             * Used with type `next`. The shopper's current session identifier; the most recent product viewed/added in that session is used as the anchor when `productId` is not supplied.
             */
            sessionId?: string;
            /**
             * Optional for `personalized`. When omitted, the response falls back to trending recommendations.
             */
            customerId?: string;
            limit?: number;
        },
    }): CancelablePromise<RecommendationResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/recommendations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
