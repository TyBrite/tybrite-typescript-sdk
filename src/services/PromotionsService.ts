/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Promotion } from '../models/Promotion';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PromotionsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List promotions
     * Get active promotions, optionally filtered by cart total
     * @returns any Success
     * @throws ApiError
     */
    public listPromotions({
        status,
        cartTotal,
        fields,
    }: {
        status?: 'active' | 'inactive' | 'scheduled' | 'expired',
        /**
         * Filter promotions by minimum cart total requirement (numeric string)
         */
        cartTotal?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `name`, `type`, `display_type`, `description`
         * - `discount_value`, `discount_type`, `min_purchase`, `max_discount`
         * - `start_date`, `end_date`, `status`
         * - `usage_limit`, `usage_per_customer`
         * - `bundle_products`, `bogo_required_products`, `bogo_free_products`, `free_products`
         * - `applicable_categories`, `applicable_products`
         * - `created_at`, `updated_at`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        promotions?: Array<Promotion>;
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/promotions',
            query: {
                'status': status,
                'cart_total': cartTotal,
                'fields': fields,
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
     * Get promotion details
     * @returns Promotion Success
     * @throws ApiError
     */
    public getPromotion({
        id,
        fields,
    }: {
        id: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `name`, `type`, `display_type`, `description`
         * - `discount_value`, `discount_type`, `min_purchase`, `max_discount`
         * - `start_date`, `end_date`, `status`
         * - `usage_limit`, `usage_per_customer`
         * - `bundle_products`, `bogo_required_products`, `bogo_free_products`, `free_products`
         * - `applicable_categories`, `applicable_products`
         * - `created_at`, `updated_at`
         *
         */
        fields?: string,
    }): CancelablePromise<Promotion> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/promotions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
