/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BestPromotion } from '../models/BestPromotion';
import type { Promotion } from '../models/Promotion';
import type { PromotionCalculation } from '../models/PromotionCalculation';
import type { PromotionCartItem } from '../models/PromotionCartItem';
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
     * the Products API to render it. Alternatively, pass `expand=products` to get the
     * promotion's bundle/BOGO products resolved with their details in one call, so you
     * don't need a second lookup (see the `expand` parameter below).
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
        expand,
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
         * Pass `expand=products` to get the promotion's bundle/BOGO products resolved
         * with their details, so you don't need a second lookup. The response then
         * additionally includes `bundle_products_resolved`,
         * `bogo_required_products_resolved`, and `bogo_free_products_resolved` — the
         * same entries as the corresponding id arrays, but each with an embedded
         * `product` object (`product_id`, `name`, `price`, `image`, `category`), or
         * `null` for any product that is unavailable.
         *
         */
        expand?: 'products',
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
                'expand': expand,
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
    /**
     * Calculate a promotion's discount for a cart
     * Compute the discount a single promotion gives for a cart, server-side. The
     * result always matches the merchant's own calculation, so your storefront never
     * reimplements the discount math (no `subtotal × percentage` on your side).
     *
     * Send the cart you intend to charge — each line is the product, its quantity, and
     * the **unit price** you're charging. How the discount is computed depends on the
     * promotion's `type`:
     * - `discount` (percentage) and `fixed` — a cart-wide discount applied to the
     * eligible cart total.
     * - `bundle` and `bogo` — computed from the products present in the cart.
     *
     * When the cart doesn't qualify (the minimum purchase isn't met, the promotion is
     * outside its active date/time window, or required products are absent), the
     * response is `eligible: false` with `discount: 0` and a `reason` explaining why.
     *
     * **Marketplace storefronts:** pass `store_id` (the `merchant_store_id` you
     * received with the promotion) to calculate against that merchant's promotion.
     *
     * @returns PromotionCalculation Success
     * @throws ApiError
     */
    public calculatePromotionDiscount({
        id,
        requestBody,
        storeId,
    }: {
        id: string,
        requestBody: {
            /**
             * The cart lines to calculate the discount against.
             */
            cart: Array<PromotionCartItem>;
        },
        /**
         * The merchant whose promotion to calculate against. Required for marketplace
         * storefronts — pass the `merchant_store_id` you received with the promotion.
         * Ignored for single-store keys.
         *
         */
        storeId?: string,
    }): CancelablePromise<PromotionCalculation> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/promotions/{id}/calculate',
            path: {
                'id': id,
            },
            query: {
                'store_id': storeId,
            },
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
    /**
     * Find the best promotion for a cart
     * Return the single highest-value eligible promotion for a cart — what to
     * auto-apply at checkout. Galactic Core evaluates every active promotion against
     * the cart server-side and returns the one that saves the customer the most, along
     * with its discount amount.
     *
     * Send the cart you intend to charge — each line is the product, its quantity, and
     * the **unit price** you're charging. When no promotion applies, `promotion` is
     * `null` and `discount` is `0`.
     *
     * **Marketplace storefronts:** pass `store_id` (the `merchant_store_id` you
     * received with the promotion or collection) to evaluate that merchant's
     * promotions.
     *
     * @returns BestPromotion Success
     * @throws ApiError
     */
    public calculateBestPromotion({
        requestBody,
        storeId,
    }: {
        requestBody: {
            /**
             * The cart lines to evaluate promotions against.
             */
            cart: Array<PromotionCartItem>;
        },
        /**
         * The merchant whose promotions to evaluate. Required for marketplace
         * storefronts — pass the `merchant_store_id` you received with the promotion
         * or collection. Ignored for single-store keys.
         *
         */
        storeId?: string,
    }): CancelablePromise<BestPromotion> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/promotions/calculate-best',
            query: {
                'store_id': storeId,
            },
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
