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
     * - **also-bought**: Frequently purchased together
     * - **trending**: Currently trending products
     * - **new**: Recently added products
     * - **personalized**: Based on a customer's preferences
     * - **bundle**: Bundle suggestions
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
     * similar, personalized, bundle. Each item is stamped with its source merchant
     * (`merchant_store_id`).
     *
     * @returns RecommendationResponse Success
     * @throws ApiError
     */
    public getRecommendations({
        requestBody,
    }: {
        requestBody: {
            type: 'similar' | 'also-bought' | 'trending' | 'new' | 'personalized' | 'bundle';
            /**
             * Required when type is `similar`, `also-bought`, or `bundle`. Must reference an existing product in the store; otherwise 404 is returned.
             */
            productId?: string;
            /**
             * Optional for `personalized`. When omitted, the worker falls back to trending recommendations.
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
