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
     * AI-powered product recommendations with 5 types:
     * - **similar**: Products similar to given product (embedding-based)
     * - **also-bought**: Frequently purchased together (co-purchase matrix)
     * - **trending**: Currently trending products (velocity-based)
     * - **personalized**: Based on customer preferences
     * - **bundle**: Bundle suggestions (semantic + co-purchase)
     *
     * **⚠️ SECRET KEY REQUIRED**
     *
     * This endpoint requires a secret key (tybrite_sk_*). Publishable keys will return 403 Forbidden.
     *
     * **Why Secret Key?** AI recommendation generation uses computational resources and accesses
     * machine learning models that should be protected from unauthorized use. This prevents abuse
     * and ensures fair resource allocation.
     *
     * @returns RecommendationResponse Success
     * @throws ApiError
     */
    public getRecommendations({
        requestBody,
    }: {
        requestBody: {
            type: 'similar' | 'also-bought' | 'trending' | 'personalized' | 'bundle';
            /**
             * Required for similar
             */
            productId?: string;
            /**
             * Required for personalized
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
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
