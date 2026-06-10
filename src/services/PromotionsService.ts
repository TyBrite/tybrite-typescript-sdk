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
        limit = 50,
        cursor,
        fields,
    }: {
        status?: 'active' | 'inactive' | 'scheduled' | 'expired',
        /**
         * Filter promotions by minimum cart total requirement (numeric string)
         */
        cartTotal?: string,
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded)
         */
        cursor?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `name`, `type`, `display_type`, `value`, `min_purchase`
         * - `start_date`, `end_date`, `status`, `conditions`, `image`
         * - `bundle_products`, `bogo_required_products`, `bogo_free_products`, `free_products`
         * - `has_time_restrictions`, `start_time`, `end_time`, `time_zone`, `apply_to_days`
         * - `created_at`, `updated_at`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        promotions?: Array<Promotion>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/promotions',
            query: {
                'status': status,
                'cart_total': cartTotal,
                'limit': limit,
                'cursor': cursor,
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
     * Get a single promotion's details, including the products it applies to.
     *
     * The `type` field tells you how the promotion works and which product fields
     * to read:
     * - `discount` (percentage) / `fixed` — a cart-level discount. There are no
     * promotion products; render `value` and any `min_purchase`.
     * - `bundle` — read `bundle_products`: a list of `{ productId, quantity, discountedPrice }`.
     * - `bogo` — read `bogo_required_products` (buy these) and `bogo_free_products`
     * (get these free): lists of `{ productId, quantity }`.
     *
     * These fields contain product **ids** — fetch each product's full detail with
     * the Products API to render it.
     *
     * **Marketplace storefronts:** when a sponsored ad placement or a curated
     * collection gives you a `promotion_id`, fetch its detail here by passing
     * `store_id` (the `merchant_store_id` you received alongside the promotion).
     * A marketplace key may read a single promotion this way; it cannot list
     * promotions.
     *
     * @returns Promotion Success
     * @throws ApiError
     */
    public getPromotion({
        id,
        storeId,
        fields,
    }: {
        id: string,
        /**
         * The merchant whose promotion to read. Required for marketplace
         * storefronts — pass the `merchant_store_id` you received with the
         * promotion. Ignored for single-store keys.
         *
         */
        storeId?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `name`, `type`, `display_type`, `value`, `min_purchase`
         * - `start_date`, `end_date`, `status`, `conditions`, `image`
         * - `bundle_products`, `bogo_required_products`, `bogo_free_products`, `free_products`
         * - `has_time_restrictions`, `start_time`, `end_time`, `time_zone`, `apply_to_days`
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
                'store_id': storeId,
                'fields': fields,
            },
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
